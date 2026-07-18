import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly authService = inject(AuthService);

  protected login() {
    this.authService.loginWithGoogle().catch((err) => console.error('Login failed:', err));
  }

  protected logout() {
    this.authService.logout().catch((err) => console.error('Logout failed:', err));
  }
}
