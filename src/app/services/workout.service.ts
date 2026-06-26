import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout, WorkoutLog } from '../models/workout.model';
import { EXERCISES } from '../data/exercises';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly WORKOUTS_KEY = 'theresistance_workouts';
  private readonly LOGS_KEY = 'theresistance_logs';

  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  private logsSubject = new BehaviorSubject<WorkoutLog[]>([]);

  constructor() {
    this.initData();
  }

  private initData() {
    // 1. Load or seed Workouts
    const storedWorkouts = localStorage.getItem(this.WORKOUTS_KEY);
    let workouts: Workout[] = [];
    
    if (storedWorkouts) {
      workouts = JSON.parse(storedWorkouts);
    } else {
      // Seed default workouts
      workouts = [
        {
          id: 'default-total-body',
          name: 'Total Body Conditioning',
          description: 'A comprehensive full-body session focusing on compound movements to build strength and conditioning.',
          createdAt: new Date().toISOString(),
          items: [
            { exerciseId: 'thruster', sets: 4, reps: 10 },
            { exerciseId: 'squat', sets: 3, reps: 12 },
            { exerciseId: 'push-up', sets: 3, reps: 15 },
            { exerciseId: 'sit-up', sets: 3, reps: 15 }
          ]
        },
        {
          id: 'default-upper-body',
          name: 'Upper Body Power & Sculpt',
          description: 'Targeted exercises for the chest, back, shoulders, and arms to improve posture and muscle tone.',
          createdAt: new Date().toISOString(),
          items: [
            { exerciseId: 'shoulder-press', sets: 3, reps: 10 },
            { exerciseId: 'row', sets: 3, reps: 12 },
            { exerciseId: 'curl', sets: 3, reps: 12 },
            { exerciseId: 'tricep-pushdown', sets: 3, reps: 12 },
            { exerciseId: 'back-fly', sets: 3, reps: 10 }
          ]
        },
        {
          id: 'default-lower-core',
          name: 'Lower Body & Core Burn',
          description: 'Strengthen the posterior chain, quads, calves, and deep core stability.',
          createdAt: new Date().toISOString(),
          items: [
            { exerciseId: 'romanian-dead-lift', sets: 3, reps: 10 },
            { exerciseId: 'lunge', sets: 3, reps: 12 },
            { exerciseId: 'calf-extension', sets: 3, reps: 15 },
            { exerciseId: 'bicycle', sets: 3, reps: 20 },
            { exerciseId: 'russian-twist', sets: 3, reps: 15 }
          ]
        }
      ];
      localStorage.setItem(this.WORKOUTS_KEY, JSON.stringify(workouts));
    }
    this.workoutsSubject.next(workouts);

    // 2. Load Logs
    const storedLogs = localStorage.getItem(this.LOGS_KEY);
    let logs: WorkoutLog[] = [];
    if (storedLogs) {
      logs = JSON.parse(storedLogs);
    } else {
      // Seed a sample log for demo purposes if empty
      logs = [
        {
          id: 'sample-log-1',
          workoutId: 'default-total-body',
          workoutName: 'Total Body Conditioning',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2).toISOString(), // 2 days ago
          notes: 'Felt strong today. Thrusters were challenging on the final set. Decreased reps slightly but completed all sets.',
          items: [
            { exerciseId: 'thruster', completedSets: 4, completedReps: 10, targetSets: 4, targetReps: 10 },
            { exerciseId: 'squat', completedSets: 3, completedReps: 12, targetSets: 3, targetReps: 12 },
            { exerciseId: 'push-up', completedSets: 3, completedReps: 15, targetSets: 3, targetReps: 15 },
            { exerciseId: 'sit-up', completedSets: 3, completedReps: 15, targetSets: 3, targetReps: 15 }
          ]
        }
      ];
      localStorage.setItem(this.LOGS_KEY, JSON.stringify(logs));
    }
    this.logsSubject.next(logs);
  }

  // --- Workouts API ---
  
  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  getWorkoutById(id: string): Workout | undefined {
    return this.workoutsSubject.value.find(w => w.id === id);
  }

  saveWorkout(workout: Omit<Workout, 'createdAt'> & { createdAt?: string }): Workout {
    const workouts = [...this.workoutsSubject.value];
    let savedWorkout: Workout;

    if (workout.id) {
      const idx = workouts.findIndex(w => w.id === workout.id);
      if (idx !== -1) {
        savedWorkout = {
          ...workout,
          createdAt: workout.createdAt || workouts[idx].createdAt
        } as Workout;
        workouts[idx] = savedWorkout;
      } else {
        savedWorkout = {
          ...workout,
          id: workout.id || this.generateGuid(),
          createdAt: new Date().toISOString()
        } as Workout;
        workouts.push(savedWorkout);
      }
    } else {
      savedWorkout = {
        ...workout,
        id: this.generateGuid(),
        createdAt: new Date().toISOString()
      } as Workout;
      workouts.push(savedWorkout);
    }

    localStorage.setItem(this.WORKOUTS_KEY, JSON.stringify(workouts));
    this.workoutsSubject.next(workouts);
    return savedWorkout;
  }

  deleteWorkout(id: string) {
    const workouts = this.workoutsSubject.value.filter(w => w.id !== id);
    localStorage.setItem(this.WORKOUTS_KEY, JSON.stringify(workouts));
    this.workoutsSubject.next(workouts);
  }

  // --- Logs API ---

  getLogs(): Observable<WorkoutLog[]> {
    return this.logsSubject.asObservable();
  }

  saveLog(log: Omit<WorkoutLog, 'id'> & { id?: string }): WorkoutLog {
    const logs = [...this.logsSubject.value];
    const savedLog: WorkoutLog = {
      ...log,
      id: log.id || this.generateGuid()
    };
    logs.push(savedLog);
    // Sort logs descending by timestamp
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    localStorage.setItem(this.LOGS_KEY, JSON.stringify(logs));
    this.logsSubject.next(logs);
    return savedLog;
  }

  deleteLog(id: string) {
    const logs = this.logsSubject.value.filter(l => l.id !== id);
    localStorage.setItem(this.LOGS_KEY, JSON.stringify(logs));
    this.logsSubject.next(logs);
  }

  // Helper helper
  private generateGuid(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
