import { getRandomInteger, getRandomArrayElement, getRandomArray, getRandomFractionalNumber } from '../utils/get-random.js';
import { getComments } from './comments';

const NAME_FILMS = [
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
const DIRECTOR = [
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
const COUNTRY = [
  'USA',
  'Ftanch',
  'Germany',
  'Italy',
];

const generatePopupData = () => {
  const COUNT = getRandomInteger(1,5);
  const comments = new Array(COUNT).fill().map(getComments);
  const name = getRandomArrayElement(NAME_FILMS);
  return {
    name,
    originalName: name,
    poster: getRandomArrayElement(POSTERS),
    description: getRandomArray(DESCRIPTIONS).join(' '),
    director: getRandomArrayElement(DIRECTOR),
    writers: getRandomArray(WRITERS).join(', '),
    actors: getRandomArray(ACTORS).join(', '),
    rating: getRandomFractionalNumber(0, 10, 1),
    releaseDate: `${getRandomInteger(1, 31)} April ${getRandomInteger(1930, 2021)} years`,
    runTime: `${getRandomInteger(0, 2)}h ${getRandomInteger(0, 59)}m`,
    country: getRandomArrayElement(COUNTRY),
    genres: getRandomArray(GENRES),
    age: getRandomInteger(12, 18),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
    comments,
  };
};
export { generatePopupData };
