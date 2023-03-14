import { Rating } from "@core/enums/rating";

export interface MoveModel {
    _id: string;
    patient: string;
    title: string;
    description?: string;
    date: Date;
    links: string[];
    comments?: string;
    done?: boolean;
    rating?: Rating;
}