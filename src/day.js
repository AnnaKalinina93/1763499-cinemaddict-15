import dayjs from 'dayjs';
import { getRandomInteger } from './utils/get-random.js';

const generateDate = () => {
  const maxDaysGap = 7;
  const yearsGap = getRandomInteger(-50,0);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap =  getRandomInteger(-12,12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
};
const getDayMonthFormat = (dueDate) => dayjs(dueDate).format('D MMMM');
const getYearsFormat = (dueDate) => dayjs(dueDate).format('YYYY');
const getTimeFormat = (dueDate) => dayjs(dueDate).format('HH:MM');
export {generateDate, getDayMonthFormat, getYearsFormat , getTimeFormat};
