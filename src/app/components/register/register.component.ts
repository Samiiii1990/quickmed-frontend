import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { PatientService } from '../../services/patient/patient.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

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

    const newUser: User = this.registerForm.value;

    this.authService.register(newUser).subscribe(
      response => {
        console.log('User registered!', response);

        if (newUser.role === 'paciente') {
          const patientData = {
            dni: newUser.dni,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            birthDate: newUser.birthDate,
            phone: newUser.phone,
            email: newUser.email,
            userId: response.userId
          };

          this.patientService.addPatient(patientData).subscribe(
            patientResponse => {
              console.log('Patient registered!', patientResponse);
              this.router.navigate(['/login']);
            },
            error => {
              console.error('Error creating patient', error);
              this.errorMessage = 'Error al crear el paciente.';
            }
          );
        } else {
          console.log('El rol seleccionado no requiere la creación de un paciente.');
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.error('Error registering user', error);
        this.errorMessage = 'Hubo un error en el registro, verifica tus datos.';
      }
    );
  }
}
