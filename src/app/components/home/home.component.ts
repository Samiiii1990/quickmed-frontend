import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Bienvenido a QuickMed';
  description = 'Gestiona tus citas médicas de forma rápida y eficiente con QuickMed.';
}
