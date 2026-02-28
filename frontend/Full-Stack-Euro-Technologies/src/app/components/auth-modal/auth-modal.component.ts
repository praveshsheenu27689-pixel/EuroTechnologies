import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  showModal = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      setTimeout(() => {
        this.showModal = true;
      }, 2000);
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  closeModal() {
    this.showModal = false;
  }

  skipModal() {
    this.showModal = false;
  }

  onLogin(form: any) {
    if (form.valid) {
      const credentials = {
        username: form.value.username,
        password: form.value.password
      };
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.closeModal();
          this.errorHandler.showSuccess(response.message || 'Login successful! Welcome back.');
        },
        error: (error) => {
          this.errorHandler.showError(error.error?.message || 'Login failed. Please check your credentials.');
        }
      });
    }
  }

  onRegister(form: any) {
    if (form.valid) {
      const data = {
        username: form.value.username,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        password: form.value.password
      };
      
      this.authService.register(data).subscribe({
        next: (response) => {
          this.closeModal();
          this.errorHandler.showSuccess(response.message || 'Registration successful! Welcome to DevBootcamp.');
        },
        error: (error) => {
          this.errorHandler.showError(error.error?.message || 'Registration failed. Please try again.');
        }
      });
    }
  }
}
