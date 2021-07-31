import { getRandomInteger, getRandomArrayElement, getRandomArray, getRandomFractionalNumber } from './utils/get-random';
//import { getComments } from './comments';
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
  'comedy',
  'drama',
  'horror',
  'romantic',
  'thriller',
  'musical',
];
const COMMENTS = [
  ' Cool movie .',
  'Interesting ending.',
  'Good actors.',
];
const generateCardFilms = () => {
  const comments = getRandomArray(COMMENTS);
  let descriptionString = getRandomArray(DESCRIPTIONS).join(' ');
  descriptionString.length < 140 ?
    descriptionString :
    descriptionString = `${descriptionString.substr(0, 139)}...`;
  return {
    name: getRandomArrayElement(NAME_FILMS),
    poster: getRandomArrayElement(POSTERS),
    description: descriptionString,
    commentedLength: comments.length,
    rating: getRandomFractionalNumber(0, 10, 1),
    year: getRandomInteger(1930, 2021),
    duration: `${getRandomInteger(0, 2)}h ${getRandomInteger(0, 59)}m`,
    genre: getRandomArrayElement(GENRES),
  };
};
export { generateCardFilms };
