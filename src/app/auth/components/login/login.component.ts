import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { AlertComponent } from "../../../helpers/alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorAlert = false;
  message = '';

  /**
   * Initializes the LoginComponent with a reactive form for user login.
   * The form contains two fields: username and password, both required.
   * @param fb - FormBuilder service for creating the form.
   * @param authService - Authentication service for handling user login.
   */
  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handles the form submission for user login.
   * Validates the form and calls the authentication service.
   * Displays an error message if the credentials are incorrect or if the form is invalid.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      if (!this.authService.login(userData)) {
        this.message = 'Credenciales incorrectas.';
        this.showErrorAlert = true;
        setTimeout(() => {
          this.message = '';
          this.showErrorAlert = false;
        }, 3000);
      }
    } else {
      this.message = 'Error al intentar iniciar sesión';
      this.showErrorAlert = true;
      setTimeout(() => {
        this.message = '';
        this.showErrorAlert = false;
      }, 3000);
    }
  }
}
