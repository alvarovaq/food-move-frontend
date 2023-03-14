import { Rating } from "@core/enums/rating";

export interface MoveRequestModel {
    patient: string;
    title: string;
    description?: string;
    date: Date;
    links: string[];
    comments?: string;
    done?: boolean;
    rating?: Rating;
}