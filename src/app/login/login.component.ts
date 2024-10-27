import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../services/auth/auth.service';  

@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
})  
export class LoginComponent {  
  loginForm: FormGroup;  

  constructor(private fb: FormBuilder, private authService: AuthService) {  
    this.loginForm = this.fb.group({  
      email: ['', Validators.required],  
      password: ['', Validators.required],  
    });  
  }  

  onLogin() {  
    if (this.loginForm.valid) {  
      this.authService.login(this.loginForm.value).subscribe(response => {  
        console.log('User logged in!', response);  
      }, error => {  
        console.error('Login error', error);  
      });  
    }  
  }  
}