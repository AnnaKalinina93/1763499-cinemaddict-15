import dayjs from 'dayjs';
import { getRandomInteger } from './utils/get-random.js';

const generateDate = () => {
  const maxDaysGap = 7;
  const yearsGap = getRandomInteger(-50,0);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap =  getRandomInteger(-12,12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
};
const getFullDateFormat = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const getYearsDateFormat = (dueDate) => dayjs(dueDate).format('YYYY');

export {generateDate, getFullDateFormat, getYearsDateFormat};
