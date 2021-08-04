import { getYearsDateFormat } from '../day';
import { transformTime } from '../utils/time-format';

export const createFilmTemplate = (film) => {
  const watchlistClassName = film.userDetails.watchlist
    ? 'film-card__controls-item--active'
    : '';
  const watchedClassName = film.userDetails.alreadyWatched
    ? 'film-card__controls-item--active'
    : '';
  const favoritesClassName = film.userDetails.favorite
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
        <h3 class="film-card__title">${film.filmInfo.title}</h3>
        <p class="film-card__rating">${film.filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getYearsDateFormat(film.filmInfo.release.date)}</span>
          <span class="film-card__duration">${transformTime(film.filmInfo.runTime)}</span>
          <span class="film-card__genre">${film.filmInfo.genres.slice(0, 1)}</span>
        </p>
        <img src=${film.filmInfo.poster} alt="" class="film-card__poster">
        <p class="film-card__description">${film.filmInfo.description.length < 140 ? film.filmInfo.description : `${film.filmInfo.description.slice(0, 140)}...`}</p>
        <a class="film-card__comments">${film.comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favoritesClassName}" type="button">Mark as favorite</button>
        </div>
      </article>`;
};
