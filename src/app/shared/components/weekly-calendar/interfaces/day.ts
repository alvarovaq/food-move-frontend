import { DayOfWeek } from "../enums/day-of-week";

export interface Day {
    day: DayOfWeek;
    date: Date;
    items: Array<any>;
}