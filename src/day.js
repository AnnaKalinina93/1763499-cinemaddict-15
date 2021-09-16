import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

const getDayMonthFormat = (dueDate) => dayjs(dueDate).format('D MMMM');
const getYearsFormat = (dueDate) => dayjs(dueDate).format('YYYY');
const getTimeFormat = (dueDate) => dayjs(dueDate).format('HH:MM');
const generateRuntime = (time) => {
  const hour = dayjs.duration(time, 'm').format('H');
  const minute = dayjs.duration(time, 'm').format('mm');
  if (time < 60) {
    return `${minute}m`;
  }
  return `${hour}h ${minute}m`;
};

const getTimeCommented = (dueDate) => dayjs(dueDate).fromNow();

const completedFimsInDateRange = (films, dateFrom, dateTo, format) =>
  films.filter((film) => dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo, format, '[)'));

export { getDayMonthFormat, getYearsFormat, getTimeFormat, generateRuntime, completedFimsInDateRange, getTimeCommented };
