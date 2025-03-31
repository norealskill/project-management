import { CalendarDay } from '../form/calendar';

export function InitCap(text: string): string {
  return text
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const yearMonthDay: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const yearMonth: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
};

export function joinClasses(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Calendar helpers */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Generating calendar days
export function generateCalendarDays(
  year: number,
  month: number,
  selectedDate: Date
): { date: Date }[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month, getDaysInMonth(year, month));
  const daysArray: CalendarDay[] = [];

  // Add padding days from the previous month
  const firstDayOfWeek = firstDayOfMonth.getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = new Date(year, month, -i);
    daysArray.unshift({ date });
  }

  // Add days from the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const genDate: Date = new Date(year, month, i);
    const today: Date = new Date(Date.now());

    daysArray.push({
      date: genDate,
      isCurrentMonth: true,
      isToday: genDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0),
      isSelected:
        genDate.setHours(0, 0, 0, 0) === selectedDate.setHours(0, 0, 0, 0),
    });
  }

  // Add padding days from the next month
  lastDayOfMonth.getDay();

  for (let i = 1; daysArray.length < 42; i++) {
    daysArray.push({ date: new Date(year, month + 1, i) });
  }
  return daysArray;
}
