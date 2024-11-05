import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  patientId: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.patientId = localStorage.getItem('patientId');
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
