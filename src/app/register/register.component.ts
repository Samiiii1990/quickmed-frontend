import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../services/auth/auth.service';  

@Component({  
  selector: 'app-register',  
  templateUrl: './register.component.html',  
})  
export class RegisterComponent {  
  registerForm: FormGroup;  

  constructor(private fb: FormBuilder, private authService: AuthService) {  
    this.registerForm = this.fb.group({  
      username: ['', Validators.required],  
      password: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
    });  
  }  

  onRegister() {  
    if (this.registerForm.valid) {  
      this.authService.register(this.registerForm.value).subscribe(response => {  
        console.log('User registered!', response);  
      }, error => {  
        console.error('Error registering user', error);  
      });  
    }  
  }  
}