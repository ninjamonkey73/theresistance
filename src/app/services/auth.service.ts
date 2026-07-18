import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User,
  Auth
} from 'firebase/auth';
import { firebaseConfig } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth;
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  
  readonly user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    // Initialize Firebase Application
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);

    // Track authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    // Prompt Google Sign-In popup
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
