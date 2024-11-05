
export class LoginResponse {
    access_token: string;
    patientId?: string;

    constructor(access_token: string, patientId?: string) {
        this.access_token = access_token;
        this.patientId = patientId;
    }
}
