export interface PatientModel {
    _id: string;
    name: string;
    surname?: string;
    email: string;
    phone?: string;
    birth?: Date;
    height?: number;
    profile_image?: string;
    employee: string;
}