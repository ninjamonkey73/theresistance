import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutLog } from '../../models/workout.model';
import { EXERCISES, Exercise } from '../../data/exercises';

@Component({
  selector: 'app-history',
  imports: [RouterLink, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class HistoryComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);

  protected readonly logs = signal<WorkoutLog[]>([]);
  protected readonly totalSets = signal(0);
  protected readonly totalReps = signal(0);
  
  // Analytics
  protected readonly categoryStats = signal<{ category: string; count: number; percentage: number }[]>([]);

  ngOnInit() {
    this.workoutService.getLogs().subscribe(l => {
      this.logs.set(l);
      this.calculateMetrics(l);
    });
  }

  private calculateMetrics(logs: WorkoutLog[]) {
    let setsSum = 0;
    let repsSum = 0;
    const categoryCounts: { [key: string]: number } = {
      'Back': 0,
      'Core': 0,
      'Lower Body': 0,
      'Total Body': 0,
      'Upper Body': 0
    };

    logs.forEach(log => {
      log.items.forEach(item => {
        setsSum += item.completedSets;
        repsSum += (item.completedReps * item.completedSets);

        const exercise = EXERCISES.find(e => e.id === item.exerciseId);
        if (exercise) {
          categoryCounts[exercise.category] = (categoryCounts[exercise.category] || 0) + item.completedSets;
        }
      });
    });

    this.totalSets.set(setsSum);
    this.totalReps.set(repsSum);

    // Calculate percentages for chart
    const maxSets = Math.max(...Object.values(categoryCounts), 1);
    const stats = Object.keys(categoryCounts).map(cat => {
      const count = categoryCounts[cat];
      return {
        category: cat,
        count,
        percentage: Math.round((count / maxSets) * 100)
      };
    }).filter(s => s.count > 0);

    // Sort by count descending
    stats.sort((a, b) => b.count - a.count);
    this.categoryStats.set(stats);
  }

  protected getExerciseDetails(exerciseId: string): Exercise | undefined {
    return EXERCISES.find(ex => ex.id === exerciseId);
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

  protected deleteLog(id: string) {
    if (confirm('Are you sure you want to delete this log entry permanently?')) {
      this.workoutService.deleteLog(id);
    }
  }
}
