export class AppointmentDto {
    id?: string;
    date?: string;
    time?: string;
    doctorId: string = '';
    status?: string;
    patientId?: string;
    doctorName: any;
    doctorSpecialization: any;
  }
  