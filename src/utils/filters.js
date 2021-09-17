import { FilterType } from '../const';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

const getGenres = (films) => {
  const allGenres = films.map((film) => film.filmInfo.genres).flat();
  return [...new Set(allGenres)];

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

const getSortGenresFilms = (genres) => {
  const sortGenres = {};
  Object.keys(genres).sort((a, b) => genres[b] - genres[a]).forEach((i) => sortGenres[i] = genres[i]);
  return sortGenres;
};

export {
  getSortGenresFilms,
  getNumbeFilmsByGenre,
  getGenres,
  filter
};
