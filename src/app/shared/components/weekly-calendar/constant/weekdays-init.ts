import { WeekdaySpn } from "../enums/weekday";
import { WeekdayItem } from "../interfaces/weekday-item.interface";

export const weekdaysInit: WeekdayItem[] = [
    {
      day: WeekdaySpn.Lunes,
      items: [],
      date: new Date()
    },
    {
      day: WeekdaySpn.Martes,
      items: [],
      date: new Date()
    },
    {
      day: WeekdaySpn.Miercoles,
      items: [],
      date: new Date()
    },
    {
      day: WeekdaySpn.Jueves,
      items: [],
      date: new Date()
    },
    {
      day: WeekdaySpn.Viernes,
      items: [],
      date: new Date()
    },
    {
      day: WeekdaySpn.Sabado,
      items: [],
      date: new Date()
    },
    {
      day:  WeekdaySpn.Domingo,
      items: [],
      date: new Date()
    }
];