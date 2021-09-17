import MenuView from '../view/menu.js';
import { render, InsertPlace, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filters.js';
import { FilterType, UpdateType } from '../const.js';
import HeaderView from '../view/header.js';
export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, handleStatistic, headerContainer) {
    this._handleStatistic = handleStatistic;
    this._filterContainer = filterContainer;
    this._headerContainer = headerContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;
    this._headerComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    const prevHeaderComponent = this._headerComponent;

    this._filterComponent = new MenuView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._headerComponent = new HeaderView(filters);
    if (prevHeaderComponent === null && filters[2].count !== 0) {
      render(this._headerContainer, this._headerComponent, InsertPlace.BEFORE_END);
    }
    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, InsertPlace.AFTER_BEGIN);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
    if (prevHeaderComponent._element === null && filters[2].count !== 0) {
      render(this._headerContainer, this._headerComponent, InsertPlace.BEFORE_END);
      return;
    }
    if (filters[2].count !== 0) {
      replace(this._headerComponent, prevHeaderComponent);
      remove(prevHeaderComponent);
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (filterType === FilterType.STATISTICS) {
      this._filterModel.setFilter(null, filterType);
      this._handleStatistic(filterType);
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._handleStatistic(filterType);


  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
