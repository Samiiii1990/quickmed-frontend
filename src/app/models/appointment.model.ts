// src/app/models/appointment.model.ts

export class Appointment {
    id?: string;
    date?: Date;                
    time?: string;
    doctorId: string; 
    status?: 'pending' | 'confirmed' | 'canceled'; 
    patientId?: string;
    doctorName?: string; 
    doctorSpecialization?: string;

    constructor(
        doctorId: string,
        id?: string,
        date?: Date,
        time?: string,
        status?: 'pending' | 'confirmed' | 'canceled',
        patientId?: string,
        doctorName?: string,
        doctorSpecialization?: string
    ) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.doctorId = doctorId;
        this.status = status;
        this.patientId = patientId;
        this.doctorName = doctorName;
        this.doctorSpecialization = doctorSpecialization;
    }
}
