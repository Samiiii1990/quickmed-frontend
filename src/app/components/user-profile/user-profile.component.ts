import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'; // Asegúrate de que este modelo esté definido
import { UserProfileService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: User | null = null;
  patientId: string | null = null;
  loading: boolean = true; 
  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.patientId = localStorage.getItem('patientId');

    if (this.patientId) {
      this.loadUserProfile(this.patientId);
    } else {
      this.loading = false;
    }
  }

  loadUserProfile(patientId: string): void {
    this.userProfileService.getUserProfile(patientId).subscribe(
      (data) => {
        this.userProfile = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
        this.loading = false;
      }
    );
  }
}
