import ButtonView from '../view/button.js';
import SiteFilmsContainerView from '../view/films-container.js';
import NameFilmListView from '../view/name-film-list.js';
import FilmListContainerView from '../view/film-list-container.js';
import AdditionalContainerView from '../view/additional-container.js';
import NumbersFilmsView from '../view/numbers-films.js';
import NoFilmsView from '../view/no-films.js';
import SiteSortView from '../view/sort.js';
import { render, InsertPlace, remove, replace } from '../utils/render.js';
import { topSortFunction, commentedSortFunction, sortFilmRating, sortFilmDate } from '../utils/sort.js';
import FilmPresenter from './film.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filters.js';

const COUNT_PER_STEP = 5;
const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';

export default class Page {
  constructor(siteElement, filmsModel, filterModel) {
    this._siteElement = siteElement;
    this._filmsModel = filmsModel;
    this._renderedCount = COUNT_PER_STEP;
    this._filmsContainer = new SiteFilmsContainerView();
    this._nameFilmListElement = new NameFilmListView();
    this._filmListContainer = new FilmListContainerView;
    this._topNameElement = new AdditionalContainerView(TOP_NAME);
    this._commentedNameElement = new AdditionalContainerView(MOST_COMMENTED_NAME);
    this._showMoreButton = null;
    this._filterModel = filterModel;
    this._filterType = FilterType.ALL;

    this._noFilmsComponent = null;
    this._currentSortType = SortType.DEFAULT;
    this._sortFilms = null;
    this._menuComponent = null;
    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderPage();

  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort(sortFilmDate);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortFilmRating);
    }
    return filtredFilms;
  }

  _rerenderSortFilms(sortType) {
    const newSortView = new SiteSortView(sortType);
    newSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
    replace(newSortView.getElement(), this._sortFilms);
    this._sortFilms = newSortView;
  }

  _renderSortFilms() {
    if (this._sortFilms !== null) {
      this._sortFilms = null;
    }
    this._sortFilms = new SiteSortView(this._currentSortType);
    render(this._siteElement, this._sortFilms, InsertPlace.BEFORE_END);
    this._sortFilms.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._rerenderSortFilms(sortType);
    this._currentSortType = sortType;
    this._clearPage({ resetRenderedFilmsCount: true });
    this._renderPage();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENTS:
        // ввести модель комментариев и добавлять комментарии
        break;
      case UserAction.DELETE_COMMENTS:
        // вести модель комментариев и удалить комментарий
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter.get(data.id).init(data);
        if (this._topFilmPresenter.get(data.id)) {
          this._topFilmPresenter.get(data.id).init(data);
        }
        if (this._commentedFilmPresenter.get(data.id)) {
          this._commentedFilmPresenter.get(data.id).init(data);
        }
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearPage({ resetRenderedFilmsCount: true, resetSortType: true });
        this._renderPage();
        break;
    }
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderTopFilm(filmListElement, film) {
    const topFilmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType);
    topFilmPresenter.init(film);
    this._topFilmPresenter.set(film.id, topFilmPresenter);
  }

  _renderCommentedFilm(filmListElement, film) {
    const commentedFilmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType);
    commentedFilmPresenter.init(film);
    this._commentedFilmPresenter.set(film.id, commentedFilmPresenter);
  }

  _renderFilms(siteElement, films, cb) {
    this._cb = cb;
    films.forEach((film) => this._cb(siteElement, film));
  }

  _renderNoFilm() {
    this._noFilmsComponent = new NoFilmsView(this._filterType);
    render(this._filmsContainer, this._noFilmsComponent, InsertPlace.BEFORE_END);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedCount = Math.min(filmsCount, this._renderedCount + COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedCount, newRenderedCount);
    this._renderFilms(this._filmListContainer, films, this._renderFilm);
    this._renderedCount = newRenderedCount;

    if (this._renderedCount >= filmsCount) {
      remove(this._showMoreButton);
    }
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderShowMoreButton() {
    if (this._showMoreButton !== null) {
      this._showMoreButton = null;
    }
    this._showMoreButton = new ButtonView();
    render(this._nameFilmListElement, this._showMoreButton, InsertPlace.BEFORE_END);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAdditionalFilmList(listName, sortFunction, cb, films) {
    this._cb = cb;
    let additionalContainer = null;
    switch (listName) {
      case TOP_NAME:
        additionalContainer = this._topNameElement;
        break;
      case MOST_COMMENTED_NAME:
        additionalContainer = this._commentedNameElement;
    }
    const filmListContainer = new FilmListContainerView();
    render(this._filmsContainer, additionalContainer, InsertPlace.BEFORE_END);
    render(additionalContainer, filmListContainer, InsertPlace.BEFORE_END);
    const sortFilms = sortFunction(films).slice(0, 2);
    this._renderFilms(filmListContainer, sortFilms, this._cb);
  }

  _renderFooter(films) {
    this._numbersFilms = new NumbersFilmsView(films);
    const siteFooterElement = document.querySelector('.footer');
    const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
    render(siteFooterSectionElement, this._numbersFilms, InsertPlace.BEFORE_END);
  }

  _renderFilmList() {
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, COUNT_PER_STEP));
    this._renderFilms(this._filmListContainer, films, this._renderFilm);
    if (filmsCount > COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderPage() {
    this._renderSortFilms();
    render(this._siteElement, this._filmsContainer, InsertPlace.BEFORE_END);
    const films = this._getFilms();
    const filmsCount = films.length;
    if (!filmsCount) {
      this._renderNoFilm();
    } else {
      render(this._filmsContainer, this._nameFilmListElement, InsertPlace.BEFORE_END);
      render(this._nameFilmListElement, this._filmListContainer, InsertPlace.BEFORE_END);
      this._renderFilms(this._filmListContainer, films.slice(0, Math.min(filmsCount, this._renderedCount)), this._renderFilm);
      if (filmsCount > this._renderedCount) {
        this._renderShowMoreButton();
      }
      this._renderAdditionalFilmList(TOP_NAME, topSortFunction, this._renderTopFilm, films);
      this._renderAdditionalFilmList(MOST_COMMENTED_NAME, commentedSortFunction, this._renderCommentedFilm, films);
      this._renderFooter(this._filmsModel.getFilms());
    }
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedCount = COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

  _clearPage({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    const filmsCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._topFilmPresenter.forEach((presenter) => presenter.destroy());
    this._topFilmPresenter.clear();
    this._commentedFilmPresenter.forEach((presenter) => presenter.destroy());
    this._commentedFilmPresenter.clear();
    remove(this._sortFilms);
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    remove(this._showMoreButton);
    remove(this._numbersFilms);
    remove(this._topNameElement);
    remove(this._commentedNameElement);

    if (resetRenderedFilmsCount) {
      this._renderedCount = COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedCount = Math.min(filmsCount, this._renderedCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

}
