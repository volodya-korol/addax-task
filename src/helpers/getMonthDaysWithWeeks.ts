import dayjs from 'dayjs';

export const getMonthDaysWithWeeks = (year: number, month: number) => {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);

  const startDayOfWeek = firstDayOfMonth.day();
  const lastDayOfMonth = firstDayOfMonth.endOf('month');
  const endDayOfWeek = lastDayOfMonth.day();
  const startOfWeek = firstDayOfMonth.subtract(startDayOfWeek === 0 ? 6 : startDayOfWeek - 1, 'day');
  const endOfWeek = lastDayOfMonth.add(endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek, 'day');

  const monthDaysWithWeeks = [];
  let currentDay = startOfWeek;

  while (currentDay.isBefore(endOfWeek)) {
    monthDaysWithWeeks.push(currentDay.format('YYYY-MM-DD'));
    currentDay = currentDay.add(1, 'day');
  }

  return monthDaysWithWeeks;
};
