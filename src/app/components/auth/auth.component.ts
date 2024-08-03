import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  form: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('dashboard');
        console.log('Login successful');
      },
      error: (err) => {
        // Handle the error here by mapping Firebase error codes to user-friendly messages
        switch (err.code) {
          case 'auth/invalid-email':
            this.loginError = 'The email address is not valid.';
            break;
          case 'auth/user-disabled':
            this.loginError = 'Your account has been disabled.';
            break;
          case 'auth/user-not-found':
            this.loginError = 'No user found with this email address.';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Incorrect password or email. Please try again.';
            break;
          default:
            this.loginError =
              'An unknown error occurred. Please try again later.';
            break;
        }
      },
    });
  }
}
