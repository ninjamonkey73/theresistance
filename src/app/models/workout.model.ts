import { Exercise } from '../data/exercises';

export interface WorkoutItem {
  exerciseId: string;
  reps: number;
  sets: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  items: WorkoutItem[];
  createdAt: string;
}

export interface LoggedExerciseItem {
  exerciseId: string;
  completedReps: number;
  completedSets: number;
  targetReps: number;
  targetSets: number;
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  workoutName: string;
  timestamp: string; // ISO date-time string
  notes: string;
  items: LoggedExerciseItem[];
}
