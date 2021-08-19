import AbstractView from './abstract';
import { SortType } from '../const';

const createSortTemplate = (newSortType) => {
  let activeClassDate = '';
  let activeClassRating = '';
  let activeClassDefault = '';

  switch (newSortType) {
    case SortType.DATE:
      activeClassDate = 'sort__button--active';
      break;
    case SortType.RATING:
      activeClassRating = 'sort__button--active';
      break;
    case SortType.DEFAULT:
      activeClassDefault = 'sort__button--active';
      break;
  }

  return `<ul class="sort">
    <li><a href="#" class="sort__button ${activeClassDefault}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${activeClassDate}" data-sort-type="${SortType.DATE}">Sort by date </a></li>
    <li><a href="#" class="sort__button ${activeClassRating}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class SiteSort extends AbstractView {
  constructor(newSortType) {
    super();
    this._newSortType = newSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._newSortType);
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

