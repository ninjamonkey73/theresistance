import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Workout, WorkoutLog } from '../models/workout.model';
import { AuthService } from './auth.service';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  getDoc,
  query,
  orderBy,
  Firestore
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService implements OnDestroy {
  private readonly WORKOUTS_KEY = 'theresistance_workouts';
  private readonly LOGS_KEY = 'theresistance_logs';

  private readonly authService = inject(AuthService);
  private firestore!: Firestore;
  
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  private logsSubject = new BehaviorSubject<WorkoutLog[]>([]);

  private authSubscription?: Subscription;
  private firestoreWorkoutsUnsubscribe?: () => void;
  private firestoreLogsUnsubscribe?: () => void;

  constructor() {
    this.firestore = getFirestore();
    this.initSync();
  }

  private initSync() {
    this.authSubscription = this.authService.user$.subscribe(async (user) => {
      this.cleanup();

      if (user) {
        // 1. Run local storage migration if old local data exists
        await this.migrateLocalStorageToFirestore(user.uid);

        // 2. Seed default workouts & logs if this is a brand new user
        await this.seedDefaultDataIfNew(user.uid);

        // 3. Set up real-time listener for workouts
        const workoutsRef = collection(this.firestore, 'users', user.uid, 'workouts');
        this.firestoreWorkoutsUnsubscribe = onSnapshot(workoutsRef, (snapshot) => {
          const workouts: Workout[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            workouts.push({
              ...data,
              id: doc.id
            } as Workout);
          });
          this.workoutsSubject.next(workouts);
        });

        // 4. Set up real-time listener for logs (sorted descending by timestamp)
        const logsRef = collection(this.firestore, 'users', user.uid, 'logs');
        const logsQuery = query(logsRef, orderBy('timestamp', 'desc'));
        this.firestoreLogsUnsubscribe = onSnapshot(logsQuery, (snapshot) => {
          const logs: WorkoutLog[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            logs.push({
              ...data,
              id: doc.id
            } as WorkoutLog);
          });
          this.logsSubject.next(logs);
        });
      } else {
        // Clear state when user is logged out
        this.workoutsSubject.next([]);
        this.logsSubject.next([]);
      }
    });
  }

  private async migrateLocalStorageToFirestore(userId: string) {
    const storedWorkouts = localStorage.getItem(this.WORKOUTS_KEY);
    const storedLogs = localStorage.getItem(this.LOGS_KEY);

    if (storedWorkouts) {
      try {
        const workouts: Workout[] = JSON.parse(storedWorkouts);
        for (const w of workouts) {
          const workoutId = w.id || this.generateGuid();
          const docRef = doc(this.firestore, 'users', userId, 'workouts', workoutId);
          await setDoc(docRef, {
            id: workoutId,
            name: w.name,
            description: w.description,
            createdAt: w.createdAt,
            items: w.items
          });
        }
      } catch (e) {
        console.error('Failed to migrate local workouts to Firestore:', e);
      }
      localStorage.removeItem(this.WORKOUTS_KEY);
    }

    if (storedLogs) {
      try {
        const logs: WorkoutLog[] = JSON.parse(storedLogs);
        for (const l of logs) {
          const logId = l.id || this.generateGuid();
          const docRef = doc(this.firestore, 'users', userId, 'logs', logId);
          await setDoc(docRef, {
            id: logId,
            workoutId: l.workoutId,
            workoutName: l.workoutName,
            timestamp: l.timestamp,
            notes: l.notes,
            items: l.items
          });
        }
      } catch (e) {
        console.error('Failed to migrate local logs to Firestore:', e);
      }
      localStorage.removeItem(this.LOGS_KEY);
    }
  }

  private async seedDefaultDataIfNew(userId: string) {
    const userDocRef = doc(this.firestore, 'users', userId);
    try {
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        // Seed default workouts
        const defaultWorkouts = [
          {
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

        for (const w of defaultWorkouts) {
          const workoutId = this.generateGuid();
          await setDoc(doc(this.firestore, 'users', userId, 'workouts', workoutId), {
            ...w,
            id: workoutId
          });
        }

        // Seed a sample log for demo purposes if empty
        const defaultLog = {
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
        };
        const logId = this.generateGuid();
        await setDoc(doc(this.firestore, 'users', userId, 'logs', logId), {
          ...defaultLog,
          id: logId
        });

        // Set the metadata flag so we don't re-seed
        await setDoc(userDocRef, { seeded: true });
      }
    } catch (e) {
      console.error('Error seeding default data for user:', e);
    }
  }

  // --- Workouts API ---
  
  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  getWorkoutById(id: string): Workout | undefined {
    return this.workoutsSubject.value.find(w => w.id === id);
  }

  saveWorkout(workout: Omit<Workout, 'createdAt'> & { createdAt?: string }): Workout {
    const user = this.authService.currentUser;
    const workoutId = workout.id || this.generateGuid();
    const savedWorkout: Workout = {
      ...workout,
      id: workoutId,
      createdAt: workout.createdAt || new Date().toISOString()
    } as Workout;

    if (user) {
      const docRef = doc(this.firestore, 'users', user.uid, 'workouts', workoutId);
      setDoc(docRef, savedWorkout).catch(err => console.error('Failed to save workout to Firestore:', err));
    }
    return savedWorkout;
  }

  deleteWorkout(id: string) {
    const user = this.authService.currentUser;
    if (user) {
      const docRef = doc(this.firestore, 'users', user.uid, 'workouts', id);
      deleteDoc(docRef).catch(err => console.error('Failed to delete workout from Firestore:', err));
    }
  }

  // --- Logs API ---

  getLogs(): Observable<WorkoutLog[]> {
    return this.logsSubject.asObservable();
  }

  saveLog(log: Omit<WorkoutLog, 'id'> & { id?: string }): WorkoutLog {
    const user = this.authService.currentUser;
    const logId = log.id || this.generateGuid();
    const savedLog: WorkoutLog = {
      ...log,
      id: logId
    };

    if (user) {
      const docRef = doc(this.firestore, 'users', user.uid, 'logs', logId);
      setDoc(docRef, savedLog).catch(err => console.error('Failed to save log to Firestore:', err));
    }
    return savedLog;
  }

  deleteLog(id: string) {
    const user = this.authService.currentUser;
    if (user) {
      const docRef = doc(this.firestore, 'users', user.uid, 'logs', id);
      deleteDoc(docRef).catch(err => console.error('Failed to delete log from Firestore:', err));
    }
  }

  private cleanup() {
    if (this.firestoreWorkoutsUnsubscribe) {
      this.firestoreWorkoutsUnsubscribe();
      this.firestoreWorkoutsUnsubscribe = undefined;
    }
    if (this.firestoreLogsUnsubscribe) {
      this.firestoreLogsUnsubscribe();
      this.firestoreLogsUnsubscribe = undefined;
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.cleanup();
  }

  private generateGuid(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
