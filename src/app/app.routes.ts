import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { WorkoutEditorComponent } from './components/workout-editor/workout-editor';
import { WorkoutLoggerComponent } from './components/workout-logger/workout-logger';
import { HistoryComponent } from './components/history/history';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workouts/new', component: WorkoutEditorComponent },
  { path: 'workouts/edit/:id', component: WorkoutEditorComponent },
  { path: 'workouts/log/:id', component: WorkoutLoggerComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: 'dashboard' }
];
