import { getRandomInteger, getRandomArrayElement, getRandomArray, getRandomFractionalNumber } from '../utils/get-random.js';
import { getComments } from './comments';
import dayjs from 'dayjs';
import { generateDate } from '../day.js';

const TITLES = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm',
];
const POSTERS = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];
const GENRES = [
  'Comedy',
  'Drama',
  'Horror',
  'Romantic',
  'Thriller',
  'Musical',
];
const DIRECTORS = [
  'Anthony Mann',
  'Jon Cromvel',
  'Armand Shafer',
  'Sam Wilson',
];
const WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Elizabet Magvaer',
  'Mark Spenser',
];
const ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Megan Fox',
  'Bred Pit',
];
const COUNTRIES = [
  'USA',
  'Ftanch',
  'Germany',
  'Italy',
];

const generateData = () => {
  const COUNT = getRandomInteger(1, 5);
  const comments = new Array(COUNT).fill().map(getComments);
  const title = getRandomArrayElement(TITLES);
  const date = generateDate();
  return {
    id: getRandomInteger(0, 50),
    comments,
    filmInfo: {
      title,
      alternativeTitle: title,
      totalRating: getRandomFractionalNumber(0, 10, 1),
      poster: getRandomArrayElement(POSTERS),
      ageRating: getRandomInteger(0, 18),
      director: getRandomArrayElement(DIRECTORS),
      writers: getRandomArray(WRITERS).join(', '),
      actors: getRandomArray(ACTORS).join(', '),
      release: {
        date,
        releaseCountry: getRandomArrayElement(COUNTRIES),
      },
      runTime: getRandomInteger(0, 300),
      genres: getRandomArray(GENRES),
      description: getRandomArray(DESCRIPTIONS).join(' '),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate:dayjs(generateDate()).format('D MMMM YYYY HH:MM'),
      favorite:  Boolean(getRandomInteger(0, 1)),
    },
  };
};
export { generateData };
