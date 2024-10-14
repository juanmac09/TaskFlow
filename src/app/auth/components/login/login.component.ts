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

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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
