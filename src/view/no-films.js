import AbstractView from './abstract';
import { FilterType } from '../const';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};
const createNoFilmsTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];
  return `<section class="films-list">
  <h2 class="films-list__title">${noFilmsTextValue}</h2>
</section>`;
};
export default class NoFilms extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoFilmsTemplate(this._data);
  }
}
/*
All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.*/
