import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor/doctor.service'; // Ensure this is the correct path

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = []; // You can define a more specific type if you have a Doctor interface
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
      (doctors) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe(
        (newDoctor) => {
          this.doctors.push(newDoctor); // Add the new doctor to the list
          this.doctorForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error adding doctor', error);
        }
      );
    }
  }
}
