export interface Patient {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birth: Date | null;
}