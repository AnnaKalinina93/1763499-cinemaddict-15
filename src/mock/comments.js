import { getRandomInteger, getRandomArrayElement} from '../utils/get-random.js';
import { generateDate } from '../day.js';
import dayjs from 'dayjs';
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
    id: getRandomInteger(1,5),
    text: getRandomArrayElement(TEXT),
    emoji: getRandomArrayElement(EMOJI),
    avtor: getRandomArrayElement(AVTOR),
    dueDate:  dayjs(dueDate).format('D MMMM HH:MM'),
  };
};

export {getComments};
