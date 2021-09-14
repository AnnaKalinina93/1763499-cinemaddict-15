import ButtonView from '../view/button.js';
import SiteFilmsContainerView from '../view/films-container.js';
import NameFilmListView from '../view/name-film-list.js';
import FilmListContainerView from '../view/film-list-container.js';
import AdditionalContainerView from '../view/additional-container.js';
import NumbersFilmsView from '../view/numbers-films.js';
import NoFilmsView from '../view/no-films.js';
import SiteSortView from '../view/sort.js';
import LoadingView from '../view/loading.js';
import { render, InsertPlace, remove, replace } from '../utils/render.js';
import { topSortFunction, commentedSortFunction, sortFilmRating, sortFilmDate } from '../utils/sort.js';
import FilmPresenter from './film.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filters.js';

const COUNT_PER_STEP = 5;
const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';

export default class Page {
  constructor(siteElement, filmsModel, filterModel, commentsModel, api) {
    this._siteElement = siteElement;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._isLoading = true;
    this._renderedCount = COUNT_PER_STEP;
    this._comments = [];
    this._api = api;
    this._filmsContainer = new SiteFilmsContainerView();
    this._nameFilmListElement = new NameFilmListView();
    this._filmListContainer = new FilmListContainerView;
    this._topNameElement = new AdditionalContainerView(TOP_NAME);
    this._commentedNameElement = new AdditionalContainerView(MOST_COMMENTED_NAME);
    this._showMoreButton = null;
    this._scrollPosition = null;
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

  }

  init() {
    this._renderPage();

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
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

  _handleViewAction(actionType, updateType, update, comments, scrollPosition) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response, comments, scrollPosition);
        });
        break;
      case UserAction.ADD_COMMENTS:
        this._commentsModel.addComment(updateType, update, comments, scrollPosition);
        break;
      case UserAction.DELETE_COMMENTS:
        this._commentsModel.deleteComment(updateType, update, comments, scrollPosition);
        break;
    }
  }

  _handleModelEvent(updateType, data, comments, scrollPosition) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter.get(data.id)) {
          this._filmPresenter.get(data.id).init(data, scrollPosition);
        }
        if (this._topFilmPresenter.get(data.id)) {
          this._topFilmPresenter.get(data.id).init(data, scrollPosition);
        }
        if (this._commentedFilmPresenter.get(data.id)) {
          this._commentedFilmPresenter.get(data.id).init(data, scrollPosition);
        }
        break;
      case UpdateType.MINOR:
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.MAJOR:
        this._clearPage({ resetRenderedFilmsCount: true, resetSortType: true });
        this._renderPage();
        break;
      case UpdateType.INIT:
        this._isLoading = false;

        remove(this._loadingComponent);
        this._renderPage();
        break;
    }
  }

  _renderLoading() {
    this._loadingComponent = new LoadingView();
    render(this._siteElement, this._loadingComponent, InsertPlace.BEFORE_END);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType, this._api, this._commentsModel);
    filmPresenter.init(film, this._scrollPosition);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderTopFilm(filmListElement, film) {
    const topFilmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType, this._api, this._commentsModel);
    topFilmPresenter.init(film, this._scrollPosition);
    this._topFilmPresenter.set(film.id, topFilmPresenter);
  }

  _renderCommentedFilm(filmListElement, film) {
    const commentedFilmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType, this._api, this._commentsModel);
    commentedFilmPresenter.init(film, this._scrollPosition);
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
    this._renderFilms(this._filmListContainer, films, this._renderFilm, this._comments);
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
    this._renderFilms(filmListContainer, sortFilms, this._cb, this._comments);
  }

  _renderFooter(films) {
    this._numbersFilms = new NumbersFilmsView(films);
    const siteFooterElement = document.querySelector('.footer');
    const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
    render(siteFooterSectionElement, this._numbersFilms, InsertPlace.BEFORE_END);
  }

  _renderPage() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
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
      if (films.filter((film) => film.filmInfo.totalRating !== 0).length !== 0) {
        this._renderAdditionalFilmList(TOP_NAME, topSortFunction, this._renderTopFilm, films);
      }
      if (films.filter((film) => film.comments.length !== 0).length !== 0) {
        this._renderAdditionalFilmList(MOST_COMMENTED_NAME, commentedSortFunction, this._renderCommentedFilm, films);
      }
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
    remove(this._loadingComponent);
    remove(this._showMoreButton);
    remove(this._numbersFilms);
    remove(this._topNameElement);
    remove(this._commentedNameElement);

    if (resetRenderedFilmsCount) {
      this._renderedCount = COUNT_PER_STEP;
    } else {

      this._renderedCount = Math.min(filmsCount, this._renderedCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  hide() {
    this._sortFilms.hide();
    this._filmsContainer.hide();
    this._nameFilmListElement.hide();
    this._filmListContainer.hide();
    this._filmPresenter.forEach((item) => item._filmComponent.hide());
    this._topNameElement.hide();
    this._commentedNameElement.hide();
    this._showMoreButton.hide();
    this._topFilmPresenter.forEach((item) => item._filmComponent.hide());
    this._commentedFilmPresenter.forEach((item) => item._filmComponent.hide());
  }

  show() {
    this._sortFilms.show();
    this._filmsContainer.show();
    this._nameFilmListElement.show();
    this._filmListContainer.show();
    this._filmPresenter.forEach((item) => item._filmComponent.show());
    this._topNameElement.show();
    this._commentedNameElement.show();
    this._showMoreButton.show();
    this._topFilmPresenter.forEach((item) => item._filmComponent.show());
    this._commentedFilmPresenter.forEach((item) => item._filmComponent.show());

  }
}
