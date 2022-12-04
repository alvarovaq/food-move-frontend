export interface PatientRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    birth: Date | null;
}