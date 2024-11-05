// src/app/models/doctor.model.ts

export class Doctor {
    id?: string;
    name: string;
    specialization: string;
    email: string;

    constructor(name: string, specialization: string, email: string, id?: string) {
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.id = id;
    }
}
