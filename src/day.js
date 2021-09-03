import dayjs from 'dayjs';
//import isBetween from 'dayjs/plugin/isBetween';
//import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { getRandomInteger } from './utils/common.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


const generateDate = () => {
  const maxDaysGap = 7;
  const yearsGap = getRandomInteger(-50, 0);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-12, 12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
};
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

const completedFimsInDateRange = (films, dateFrom, dateTo) => {
  const correctFilms = [];
  films.forEach((film) => {
    if (
      dayjs(film.userDetails.watchingDate).isSame(dateFrom) ||
      dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.userDetails.watchingDate).isSame(dateTo)
    ) {
      correctFilms.push(film);
    }
  });
  return correctFilms;
};

export { generateDate, getDayMonthFormat, getYearsFormat, getTimeFormat, generateRuntime, completedFimsInDateRange };
