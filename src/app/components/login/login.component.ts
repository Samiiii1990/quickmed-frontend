import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';  
import { LoginRequest } from '../../models/login-request.model';
import { LoginResponse } from '../../models/login-response.model';

@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']
})  
export class LoginComponent {  
  loginForm: FormGroup;
  errorMessage: string = '';  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {  
    this.loginForm = this.fb.group({  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required],  
    });  
  }  

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor ingresa tu email y contraseña correctamente';
      return;
    }

    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe((response: LoginResponse) => {
      this.authService.saveToken(response.access_token);
      console.log('Usuario Logueado!');

      const patientId = response.patientId;
      localStorage.setItem('patientId', patientId);
      this.router.navigate(['/scheduled-list', { id: patientId }]);
    }, error => {
      console.error('Login error', error);
      this.errorMessage = 'Email o contraseña inválido';
    });
  }
}
