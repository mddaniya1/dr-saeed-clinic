export type DaySchedule = { day: string; hours: string[] };

export const weeklySchedule: DaySchedule[] = [
  { day: "Monday", hours: ["11:00 AM – 01:00 PM", "03:00 PM – 10:00 PM"] },
  { day: "Tuesday", hours: ["11:00 AM – 01:00 PM", "03:00 PM – 10:00 PM"] },
  { day: "Wednesday", hours: ["11:00 AM – 01:00 PM", "03:00 PM – 10:00 PM"] },
  { day: "Thursday", hours: ["11:00 AM – 01:00 PM", "03:00 PM – 10:00 PM"] },
  { day: "Friday", hours: ["05:00 PM – 10:00 PM"] },
  { day: "Saturday", hours: ["11:00 AM – 01:00 PM", "03:00 PM – 10:00 PM"] },
  { day: "Sunday", hours: ["Closed"] },
];

function toLabel(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

function range(startMin: number, endMin: number) {
  const out: string[] = [];
  for (let t = startMin; t <= endMin - 30; t += 30) out.push(toLabel(t));
  return out;
}

/** Time slots (30-min steps) available on a given date. Sunday => none. */
export function slotsForDate(date: Date | undefined): string[] {
  if (!date) return [];
  const day = date.getDay(); // 0 = Sunday, 5 = Friday
  if (day === 0) return [];
  if (day === 5) return range(17 * 60, 22 * 60);
  return [...range(11 * 60, 13 * 60), ...range(15 * 60, 22 * 60)];
}

export function isSunday(date: Date) {
  return date.getDay() === 0;
}
