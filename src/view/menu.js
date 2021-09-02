import AbstractView from './abstract';
import { FilterType } from '../const';

const createMenuTemplate = (filterItems, currentFilterType) => {
  const allFilter = filterItems[0];
  const watchlistFilter = filterItems[1];
  const historyFilter = filterItems[2];
  const favoritesFilter = filterItems[3];
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
     <a href="#all" type= ${allFilter.type} class="main-navigation__item ${allFilter.type === currentFilterType ? 'main-navigation__item--active' : ''}">All movies</a>
     <a href="#watchlist" type=${watchlistFilter.type} class="main-navigation__item ${watchlistFilter.type === currentFilterType ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${watchlistFilter.count}</span></a>
     <a href="#history" type= ${historyFilter.type} class="main-navigation__item ${historyFilter.type === currentFilterType ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${historyFilter.count}</span></a>
     <a href="#favorites" type = ${favoritesFilter.type} class="main-navigation__item ${favoritesFilter.type === currentFilterType ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${favoritesFilter.count}</span></a>
    </div>
    <a href="#stats"  type = ${FilterType.STATISTICS} class="main-navigation__additional ${currentFilterType === FilterType.STATISTICS? 'main-navigation__item--active' : ''}">Stats</a>
  </nav>`;
};
export default class Menu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
