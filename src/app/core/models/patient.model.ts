export interface PatientModel {
    _id: string;
    name: string;
    surname?: string;
    email: string;
    phone?: string;
    birth?: Date;
    profile_image?: string;
}