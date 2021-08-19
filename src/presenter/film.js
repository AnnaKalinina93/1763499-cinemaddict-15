import { render, InsertPlace, remove, replace, isEscape } from '../utils/render.js';
import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class Film {
  constructor(filmListElement, changeData, changeMode) {
    this._filmListElement = filmListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmComponent = null;
    this._popupComponent = null;
    this._siteBodyElement = document.querySelector('body');
    this._mode = Mode.DEFAULT;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmView(film);
    this._popupComponent = new PopupView(film);


    this._filmComponent.setClickHandler(this._handleOpenClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setClickHandler(this._handleCloseClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._filmListElement, this._filmComponent, InsertPlace.BEFORE_END);
      return;
    }

    if (this._filmListElement.getElement().contains((prevFilmComponent.getElement())) && this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);

    }
    if (this._siteBodyElement.contains((prevPopupComponent.getElement())) && this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopupFilm();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ),
    );
  }

  _handleOpenClick() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _handleCloseClick() {
    this._closePopupFilm();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPopupFilm() {
    this._siteBodyElement.classList.add('hide-overflow');
    render(this._siteBodyElement, this._popupComponent, InsertPlace.BEFORE_END);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopupFilm() {

    this._siteBodyElement.classList.remove('hide-overflow');
    this._popupComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscape(evt)) {
      evt.preventDefault();
      this._closePopupFilm();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

}
