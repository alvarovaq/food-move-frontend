import { WeekdaySpn } from "../enums/weekday";

export interface WeekdayItem {
    day: WeekdaySpn;
    date: Date;
    items: Array<any>;
}