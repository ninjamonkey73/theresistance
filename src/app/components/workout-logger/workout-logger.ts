import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { Workout, WorkoutLog, LoggedExerciseItem } from '../../models/workout.model';
import { EXERCISES, Exercise } from '../../data/exercises';

@Component({
  selector: 'app-workout-logger',
  imports: [RouterLink, FormsModule],
  templateUrl: './workout-logger.html',
  styleUrl: './workout-logger.css',
})
export class WorkoutLoggerComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly workout = signal<Workout | null>(null);
  protected readonly logDate = signal('');
  protected readonly logTime = signal('');
  protected readonly logNotes = signal('');
  protected readonly loggedItems = signal<LoggedExerciseItem[]>([]);
  
  protected readonly showCelebration = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const w = this.workoutService.getWorkoutById(id);
        if (w) {
          this.workout.set(w);
          
          // Set default date/time to current local time
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          this.logDate.set(`${year}-${month}-${day}`);
          
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          this.logTime.set(`${hours}:${minutes}`);

          // Prep logger items defaulting to targets
          const items: LoggedExerciseItem[] = w.items.map(item => ({
            exerciseId: item.exerciseId,
            completedSets: item.sets,
            completedReps: item.reps,
            targetSets: item.sets,
            targetReps: item.reps
          }));
          this.loggedItems.set(items);
        } else {
          this.errorMessage.set('Workout plan not found.');
        }
      }
    });
  }

  protected getExerciseDetails(exerciseId: string): Exercise | undefined {
    return EXERCISES.find(ex => ex.id === exerciseId);
  }

  protected adjustCompletedSets(index: number, delta: number) {
    const items = [...this.loggedItems()];
    const newVal = items[index].completedSets + delta;
    if (newVal >= 0) {
      items[index].completedSets = newVal;
      this.loggedItems.set(items);
    }
  }

  protected adjustCompletedReps(index: number, delta: number) {
    const items = [...this.loggedItems()];
    const newVal = items[index].completedReps + delta;
    if (newVal >= 0) {
      items[index].completedReps = newVal;
      this.loggedItems.set(items);
    }
  }

  protected submitLog() {
    const currentWorkout = this.workout();
    if (!currentWorkout) {
      this.errorMessage.set('Cannot save log. Workout plan is undefined.');
      return;
    }

    // Combine date and time to create ISO timestamp
    const dateStr = this.logDate();
    const timeStr = this.logTime();
    
    let timestamp = new Date().toISOString();
    if (dateStr && timeStr) {
      const combined = new Date(`${dateStr}T${timeStr}`);
      if (!isNaN(combined.getTime())) {
        timestamp = combined.toISOString();
      }
    }

    const logPayload: Omit<WorkoutLog, 'id'> = {
      workoutId: currentWorkout.id,
      workoutName: currentWorkout.name,
      timestamp,
      notes: this.logNotes().trim(),
      items: this.loggedItems()
    };

    this.workoutService.saveLog(logPayload);
    
    // Trigger fun celebration micro-animation
    this.showCelebration.set(true);
    
    // Wait for animation, then navigate back
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
}
