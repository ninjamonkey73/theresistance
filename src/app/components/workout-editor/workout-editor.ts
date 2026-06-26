import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { Workout, WorkoutItem } from '../../models/workout.model';
import { EXERCISES, Exercise } from '../../data/exercises';

@Component({
  selector: 'app-workout-editor',
  imports: [RouterLink, FormsModule],
  templateUrl: './workout-editor.html',
  styleUrl: './workout-editor.css',
})
export class WorkoutEditorComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Available catalog
  protected readonly allExercises = EXERCISES;
  protected readonly categories = ['All', 'Back', 'Core', 'Lower Body', 'Total Body', 'Upper Body'];
  protected readonly selectedCategory = signal('All');
  protected readonly searchQuery = signal('');

  // Editing state
  protected readonly isEditMode = signal(false);
  protected readonly workoutId = signal<string | null>(null);
  protected readonly workoutName = signal('');
  protected readonly workoutDescription = signal('');
  protected readonly workoutItems = signal<WorkoutItem[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const existingWorkout = this.workoutService.getWorkoutById(id);
        if (existingWorkout) {
          this.isEditMode.set(true);
          this.workoutId.set(existingWorkout.id);
          this.workoutName.set(existingWorkout.name);
          this.workoutDescription.set(existingWorkout.description);
          // Clone the array items to prevent immediate mutation before saving
          this.workoutItems.set(existingWorkout.items.map(item => ({ ...item })));
        } else {
          this.errorMessage.set('Workout plan not found.');
        }
      }
    });
  }

  // Catalog filtering
  protected getFilteredExercises(): Exercise[] {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allExercises.filter(ex => {
      const matchesCategory = category === 'All' || ex.category === category;
      const matchesSearch = ex.name.toLowerCase().includes(query) || ex.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }

  protected setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  // Builder operations
  protected addExercise(exercise: Exercise) {
    const currentItems = this.workoutItems();
    // Check if exercise already in workout, if so we can just increase sets or let it be added again
    const existingIndex = currentItems.findIndex(item => item.exerciseId === exercise.id);
    
    if (existingIndex !== -1) {
      // Just increment sets if already there
      const updated = [...currentItems];
      updated[existingIndex].sets += 1;
      this.workoutItems.set(updated);
    } else {
      // Add new item
      this.workoutItems.set([...currentItems, {
        exerciseId: exercise.id,
        sets: 3,
        reps: 10
      }]);
    }
  }

  protected removeWorkoutItem(index: number) {
    const current = [...this.workoutItems()];
    current.splice(index, 1);
    this.workoutItems.set(current);
  }

  protected adjustSets(index: number, delta: number) {
    const current = [...this.workoutItems()];
    const newSets = current[index].sets + delta;
    if (newSets >= 1) {
      current[index].sets = newSets;
      this.workoutItems.set(current);
    }
  }

  protected adjustReps(index: number, delta: number) {
    const current = [...this.workoutItems()];
    const newReps = current[index].reps + delta;
    if (newReps >= 1) {
      current[index].reps = newReps;
      this.workoutItems.set(current);
    }
  }

  protected getExerciseDetails(exerciseId: string): Exercise | undefined {
    return this.allExercises.find(ex => ex.id === exerciseId);
  }

  // Save / Submit
  protected saveWorkout() {
    if (!this.workoutName().trim()) {
      this.errorMessage.set('Please provide a name for your workout plan.');
      return;
    }

    if (this.workoutItems().length === 0) {
      this.errorMessage.set('Please add at least one exercise to your workout plan.');
      return;
    }

    const payload: Omit<Workout, 'createdAt'> = {
      id: this.workoutId() || '',
      name: this.workoutName().trim(),
      description: this.workoutDescription().trim(),
      items: this.workoutItems()
    };

    this.workoutService.saveWorkout(payload);
    this.router.navigate(['/dashboard']);
  }
}
