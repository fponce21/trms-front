import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {
  isLoginMode = signal(true);
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '', role: 'EMPLOYEE', email: '' };
  errorMessage = signal('');
  isLoading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode.update((value) => !value);
    this.errorMessage.set('');
  }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    if (this.isLoginMode()) {
      this.authService.login(this.loginData.username, this.loginData.password).subscribe({
        next: () => {
          this.isLoading.set(false);
          localStorage.setItem('username', this.loginData.username);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Invalid username or password');
        },
      });
    } else {
      this.authService.register(this.registerData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isLoginMode.set(true);
          this.errorMessage.set('Registration successful! Please log in.');
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Registration failed. Username or email may exist.');
        },
      });
    }
  }

}
