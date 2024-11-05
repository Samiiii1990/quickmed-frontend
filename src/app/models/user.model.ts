
export class User {
    dni: string;             
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    role: string;
    password: string;

    constructor(
        dni: string,
        firstName: string,
        lastName: string,
        birthDate: string,
        phone: string,
        email: string,
        role: string,
        password: string
    ) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
