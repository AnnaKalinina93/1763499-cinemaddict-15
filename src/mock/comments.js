import { getRandomArrayElement , getRandomInteger} from '../utils/common.js';
import { generateDate,  getTimeFormat, getDayMonthFormat } from '../day.js';
import { nanoid } from 'nanoid';

const TEXT = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];
const EMOJI = [
  'images/emoji/angry.png',
  'images/emoji/puke.png',
  'images/emoji/sleeping.png',
  'images/emoji/smile.png',
];
const AVTOR = [
  'Tim Macoveev',
  'John Doe',
  'Sam Smit',
  'Robert Shenisy',
];

const getComments = () => {
  const dueDate = generateDate();
  return {
    id: nanoid(),
    text: getRandomArrayElement(TEXT),
    emoji: getRandomArrayElement(EMOJI),
    avtor: getRandomArrayElement(AVTOR),
    dueDate:`${getDayMonthFormat(dueDate)} ${getTimeFormat(dueDate)}`,
  };
};
//const COUNT = getRandomInteger(0,6);
const comments = () => new Array(5).fill().map(getComments);
export {getComments, comments};
