import { getYearsFormat } from '../day';
import { transformTime } from '../utils/time-format';
import { createElement } from '../utils/render';

const createFilmTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      poster,
      release: {
        date,
      },
      runTime,
      genres,
      description,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
  } = film;
  const watchlistClassName = watchlist
    ? 'film-card__controls-item--active'
    : '';
  const watchedClassName = alreadyWatched
    ? 'film-card__controls-item--active'
    : '';
  const favoritesClassName = favorite
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getYearsFormat(date)}</span>
          <span class="film-card__duration">${transformTime(runTime)}</span>
          <span class="film-card__genre">${genres.slice(0, 1)}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${description.length < 140 ? description : `${description.slice(0, 140)}...`}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favoritesClassName}" type="button">Mark as favorite</button>
        </div>
      </article>`;
};
export default class SiteFilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
