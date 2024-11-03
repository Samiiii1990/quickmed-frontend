import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { PatientService } from '../services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      dni: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }
  
    // Registro del usuario
    this.authService.register(this.registerForm.value).subscribe(
      response => {
        console.log('User registered!', response);
        localStorage.setItem('emailForm', response.email);
  
        // Verificar el rol seleccionado
        if (this.registerForm.value.role === 'paciente') { // Asegúrate de que el valor del rol coincida
          // Crear el paciente ahora
          const patientData = {
            dni: this.registerForm.value.dni,
            firstName: this.registerForm.value.firstName,
            lastName: this.registerForm.value.lastName,
            birthDate: this.registerForm.value.birthDate,
            phone: this.registerForm.value.phone,
            email: this.registerForm.value.email,
            userId: response.userId // Asegúrate de que este campo esté presente
          };
  
          // Ahora puedes llamar a createPatient
          this.patientService.addPatient(patientData).subscribe(
            patientResponse => {
              console.log('Patient registered!', patientResponse);
              this.router.navigate(['/login']); // Redirigir a login después del registro
            },
            error => {
              console.error('Error creating patient', error);
              this.errorMessage = 'Error al crear el paciente.';
            }
          );
        } else {
          // Si no es paciente, redirigir o manejar el caso de otra manera
          console.log('El rol seleccionado no requiere la creación de un paciente.');
          this.router.navigate(['/login']); // Redirigir a login
        }
      },
      error => {
        console.error('Error registering user', error);
        this.errorMessage = 'Hubo un error en el registro, verifica tus datos.';
      }
    );
  }
}
