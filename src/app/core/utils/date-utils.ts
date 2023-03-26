export function addDay (date: Date, days: number): Date {
    const cpy_date = new Date(date);
    return new Date(cpy_date.setDate(cpy_date.getDate() + days));
}

export function getDay (date: Date): number {
    const day = date.getDay();
    return day == 0 ? 7 : day;
}

export function getDateRange (date: Date): {startDate: Date, endDate: Date} {
    return {
      startDate: addDay(date, -1 * getDay(date) + 1),
      endDate: addDay(date, 7 - getDay(date))
    }
}