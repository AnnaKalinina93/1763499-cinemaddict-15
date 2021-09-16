import { FilterType } from '../const';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

const getGenres = (films) => {
  const allGenresArray = films.map((film) => film.filmInfo.genres).flat();
  return [...new Set(allGenresArray)];

};

const getNumbeFilmsByGenre = (films) => {
  const genres = getGenres(films);
  const result = {};
  genres.forEach((genre) => {
    result[genre] = 0;
    films.forEach((film) => film.filmInfo.genres.forEach((item) => {
      if (genre === item) {
        result[genre] += 1;
      }
    }));
  });
  return result;
};

const getSortGenresFilms = (obj) => {
  const newObj = {};
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((i) => newObj[i] = obj[i]);
  return newObj;
};

export {
  getSortGenresFilms,
  getNumbeFilmsByGenre,
  getGenres,
  filter
};
