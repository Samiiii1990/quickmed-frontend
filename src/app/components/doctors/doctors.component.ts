import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model'; // Importar el modelo Doctor

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  doctorForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = this.doctorForm.value; 
      this.doctorService.addDoctor(newDoctor).subscribe(
        (addedDoctor: Doctor) => { 
          this.doctors.push(addedDoctor);
          this.doctorForm.reset();
        },
        (error) => {
          console.error('Error adding doctor', error);
        }
      );
    }
  }
}
