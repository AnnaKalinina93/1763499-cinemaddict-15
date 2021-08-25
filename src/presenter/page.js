import ButtonView from '../view/button.js';
import SiteFilmsContainerView from '../view/films-container.js';
import NameFilmListView from '../view/name-film-list.js';
import FilmListContainerView from '../view/film-list-container.js';
import AdditionalContainerView from '../view/additional-container.js';
import NumbersFilmsView from '../view/numbers-films.js';
import NoFilmsView from '../view/no-films.js';
import SiteSortView from '../view/sort.js';
import MenuView from '../view/menu.js';
import { render, InsertPlace, remove , replace} from '../utils/render.js';
import { topSortFunction, commentedSortFunction, sortFilmRating, sortFilmDate } from '../utils/sort.js';
import FilmPresenter from './film.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';

const COUNT_PER_STEP = 5;
const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';

export default class Page {
  constructor(siteElement) {
    this._siteElement = siteElement;
    this._renderedCount = COUNT_PER_STEP;
    this._filmsContainer = new SiteFilmsContainerView();
    this._nameFilmListElement = new NameFilmListView();
    this._filmListContainer = new FilmListContainerView;
    this._showMoreButton = new ButtonView();
    this._noFilmsComponent = new NoFilmsView();
    this._currentSortType = SortType.DEFAULT;
    this._sortFilms = new SiteSortView(this._currentSortType);
    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._renderMenu();
    this._renderSortFilms();
    render(this._siteElement, this._filmsContainer, InsertPlace.BEFORE_END);
    this._renderPage();

  }

  _renderMenu() {
    const menuComponent = new MenuView(this._films);
    render(this._siteElement, menuComponent, InsertPlace.BEFORE_END);
  }

  _rerenderSortFilms(sortType) {
    const newSortView = new SiteSortView(sortType);
    newSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
    replace(newSortView.getElement(), this._sortFilms);
    this._sortFilms = newSortView;
  }

  _renderSortFilms() {
    render(this._siteElement, this._sortFilms, InsertPlace.BEFORE_END);
    this._sortFilms.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._rerenderSortFilms(sortType);
    this._sortFilmsList(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }


  _sortFilmsList(sortType) {

    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleFilmChange(updatedTask) {
    this._films = updateItem(this._films, updatedTask);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedTask);
    if (this._filmPresenter.get(updatedTask.id)) {
      this._filmPresenter.get(updatedTask.id).init(updatedTask);
    }
    if (this._topFilmPresenter.get(updatedTask.id)) {
      this._topFilmPresenter.get(updatedTask.id).init(updatedTask);
    }
    if (this._commentedFilmPresenter.get(updatedTask.id)) {
      this._commentedFilmPresenter.get(updatedTask.id).init(updatedTask);
    }
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(filmListElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderTopFilm(filmListElement, film) {
    const topFilmPresenter = new FilmPresenter(filmListElement, this._handleFilmChange, this._handleModeChange);
    topFilmPresenter.init(film);
    this._topFilmPresenter.set(film.id, topFilmPresenter);
  }

  _renderCommentedFilm(filmListElement, film) {
    const commentedFilmPresenter = new FilmPresenter(filmListElement, this._handleFilmChange, this._handleModeChange);
    commentedFilmPresenter.init(film);
    this._commentedFilmPresenter.set(film.id, commentedFilmPresenter);
  }

  _renderFilms(from, to, siteElement, films, cb) {
    this._cb = cb;
    films
      .slice(from, to)
      .forEach((film) => this._cb(siteElement, film));
  }

  _renderNoFilm() {
    render(this._filmsContainer, this._noFilmsComponent, InsertPlace.BEFORE_END);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedCount, this._renderedCount + COUNT_PER_STEP, this._filmListContainer, this._films, this._renderFilm);
    this._renderedCount += COUNT_PER_STEP;

    if (this._renderedCount >= this._films.length) {
      remove(this._showMoreButton);
    }
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderShowMoreButton() {
    render(this._nameFilmListElement, this._showMoreButton, InsertPlace.BEFORE_END);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAdditionalFilmList(listName, sortFunction, count = 2, cb) {
    this._cb = cb;
    const additionalContainer = new AdditionalContainerView(listName);
    const filmListContainer = new FilmListContainerView();
    render(this._filmsContainer, additionalContainer, InsertPlace.BEFORE_END);
    render(additionalContainer, filmListContainer, InsertPlace.BEFORE_END);
    const sortFilms = sortFunction(this._films);
    this._renderFilms(0, count, filmListContainer, sortFilms, this._cb);
  }

  _renderFooter() {
    this._numbersFilms = new NumbersFilmsView(this._films);
    const siteFooterElement = document.querySelector('.footer');
    const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
    render(siteFooterSectionElement, this._numbersFilms, InsertPlace.BEFORE_END);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, COUNT_PER_STEP), this._filmListContainer, this._films, this._renderFilm);
    if (this._films.length > COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderPage() {
    if (!this._films.length) {
      this._renderNoFilm();
    } else {
      render(this._filmsContainer, this._nameFilmListElement, InsertPlace.BEFORE_END);
      render(this._nameFilmListElement, this._filmListContainer, InsertPlace.BEFORE_END);
      this._renderFilmList();
      this._renderAdditionalFilmList(TOP_NAME, topSortFunction, 2, this._renderTopFilm);
      this._renderAdditionalFilmList(MOST_COMMENTED_NAME, commentedSortFunction, 2, this._renderCommentedFilm);
      this._renderFooter();
    }

  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedCount = COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

}
