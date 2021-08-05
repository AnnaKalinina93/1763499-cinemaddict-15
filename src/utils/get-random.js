// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomFractionalNumber = (min, max, numberAfterDecimalPoint = 2) => {
  if (max > min && max >= 0 && min >= 0) {
    const intermediateValue = Math.random() * (max - min + 1) + min;
    return Number(intermediateValue.toFixed(numberAfterDecimalPoint));
  }
  return 'Задайте верные параметры функции.Число "от" должно быть меньше числа "до" и оба больше нуля';
};
const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomArray = (array) => {
  const newArray = array.filter(() => getRandomInteger(0, 1));
  return newArray !== null ? newArray : getRandomArrayElement(array);
};

export { getRandomArrayElement, getRandomInteger, getRandomArray, getRandomFractionalNumber };
