import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';  

@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']
})  
export class LoginComponent {  
  loginForm: FormGroup;
  errorMessage: string = '';  

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router ) {  
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

    this.authService.login(this.loginForm.value).subscribe(response => {
        this.authService.saveToken(response.access_token);
        console.log('Usuario Logueado!');

        // Obtener el ID del paciente de la respuesta
        const patientId = response.patientId; // Asegúrate de que este campo esté en la respuesta
        this.router.navigate(['/scheduled-list', { id: patientId }]); // Pasar el ID del paciente a la ruta
    }, error => {
        console.error('Login error', error);
        this.errorMessage = 'Email o contraseña inválido';
    });
}
}