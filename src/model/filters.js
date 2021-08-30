import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter, comments) {
    this._activeFilter = filter;
    this._notify(updateType, filter, comments);
  }

  getFilter() {
    return this._activeFilter;
  }
}
