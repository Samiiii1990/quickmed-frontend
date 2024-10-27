import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../services/auth/auth.service';  
import { Router } from '@angular/router';  

@Component({  
  selector: 'app-register',  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})  
export class RegisterComponent {  
  registerForm: FormGroup;
  errorMessage: string = '';    

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {  
    this.registerForm = this.fb.group({  
      password: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
    });  
  }  

  onRegister() {  
    if (this.registerForm.invalid) {  
      this.errorMessage = 'Por favor ingresa tu email y contraseña correctamente';
      return;
    }

      this.authService.register(this.registerForm.value).subscribe(response => {  
        console.log('User registered!', response);  
        this.router.navigate(['/login']);
      }, error => {  
        console.error('Error registering user', error);  
        this.errorMessage = 'Email o contaseña inválido';  
      });  
  }  
}