// Para no tener 'any' por ahí sueltos
export type ScheduleItem = { time: string; title: string; description: string };
export type DaySchedule = { day: string; date: string; items: ScheduleItem[] };
