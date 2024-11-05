export class Appointment {
    id: string;
    date?: Date;                
    time?: string;
    doctorId: string; 
    status?: 'pending' | 'confirmed' | 'canceled'; 
    patientId?: string;
    patientDNI?: string;
    doctorName?: string; 
    doctorSpecialization?: string;
    notes?: string;

    constructor(
        doctorId: string,
        id: string,
        date?: Date,
        time?: string,
        status?: 'pending' | 'confirmed' | 'canceled',
        patientId?: string,
        patientDNI?: string,
        doctorName?: string,
        doctorSpecialization?: string,
        notes?: string
    ) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.doctorId = doctorId;
        this.status = status;
        this.patientId = patientId;
        this.patientDNI = patientDNI;
        this.doctorName = doctorName;
        this.doctorSpecialization = doctorSpecialization;
        this.notes = notes;
    }
}
