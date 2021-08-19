
import dayjs from 'dayjs';
const topSortFunction = (films) => [...films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
const commentedSortFunction = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);

const sortFilmDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortFilmRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {topSortFunction,
  commentedSortFunction,
  sortFilmDate,
  sortFilmRating};
