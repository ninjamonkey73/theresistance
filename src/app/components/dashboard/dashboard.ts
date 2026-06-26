import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { Workout, WorkoutLog } from '../../models/workout.model';
import { EXERCISES } from '../../data/exercises';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);

  protected readonly workouts = signal<Workout[]>([]);
  protected readonly logs = signal<WorkoutLog[]>([]);

  // Analytics Metrics
  protected readonly totalWorkouts = signal(0);
  protected readonly totalLogs = signal(0);
  protected readonly lastActiveDate = signal<string | null>(null);
  protected readonly categoryStats = signal<{ category: string; count: number }[]>([]);

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(w => {
      this.workouts.set(w);
      this.totalWorkouts.set(w.length);
    });

    this.workoutService.getLogs().subscribe(l => {
      this.logs.set(l);
      this.totalLogs.set(l.length);
      
      if (l.length > 0) {
        this.lastActiveDate.set(l[0].timestamp);
      } else {
        this.lastActiveDate.set(null);
      }

      this.calculateStats(l);
    });
  }

  private calculateStats(logs: WorkoutLog[]) {
    const counts: { [key: string]: number } = {
      'Back': 0,
      'Core': 0,
      'Lower Body': 0,
      'Total Body': 0,
      'Upper Body': 0
    };

    logs.forEach(log => {
      log.items.forEach(item => {
        const exercise = EXERCISES.find(e => e.id === item.exerciseId);
        if (exercise) {
          counts[exercise.category] = (counts[exercise.category] || 0) + item.completedSets;
        }
      });
    });

    const stats = Object.keys(counts).map(key => ({
      category: key,
      count: counts[key]
    })).filter(s => s.count > 0);

    this.categoryStats.set(stats);
  }

  protected getExerciseName(exerciseId: string): string {
    const exercise = EXERCISES.find(e => e.id === exerciseId);
    return exercise ? exercise.name : 'Unknown Exercise';
  }

  protected getExerciseCategory(exerciseId: string): string {
    const exercise = EXERCISES.find(e => e.id === exerciseId);
    return exercise ? exercise.category : 'General';
  }

  protected getExerciseImage(exerciseId: string): string {
    const exercise = EXERCISES.find(e => e.id === exerciseId);
    return exercise ? exercise.imagePath : '';
  }

  protected deleteWorkout(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this workout plan? This will not delete your historical logs.')) {
      this.workoutService.deleteWorkout(id);
    }
  }

  protected deleteLog(id: string) {
    if (confirm('Are you sure you want to delete this workout log entry?')) {
      this.workoutService.deleteLog(id);
    }
  }
}
