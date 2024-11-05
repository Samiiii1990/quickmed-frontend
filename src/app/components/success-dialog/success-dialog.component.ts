import { Component } from '@angular/core';  
import { MatDialogRef } from '@angular/material/dialog';  

@Component({  
  selector: 'app-success-dialog',  
  template: `  
    <h1 mat-dialog-title>Éxito</h1>  
    <div mat-dialog-content>  
      <p>Su turno ha sido agendado exitosamente.</p>  
    </div>  
    <div mat-dialog-actions>  
      <button mat-button (click)="onClose()">Cerrar</button>  
    </div>  
  `,  
})  
export class SuccessDialogComponent {  
  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>) {}  

  onClose(): void {  
    this.dialogRef.close();  
  }  
}