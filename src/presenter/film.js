import { render, InsertPlace, remove, replace, isEscape } from '../utils/render.js';
import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';
import { UserAction, UpdateType, Mode, FilterType } from '../const.js';

export default class Film {
  constructor(filmListElement, changeData, changeMode, filterType) {
    this._filmListElement = filmListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmComponent = null;
    this._popupComponent = null;
    this._siteBodyElement = document.querySelector('body');
    this._mode = Mode.DEFAULT;
    this._filterType = filterType;
    this._scrollPosition = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;
    this._comments = this._getCommentsFilm(this._film);

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmView(this._film);
    this._popupComponent = new PopupView(this._film, this._changeData, this._comments, this._scrollPosition, this._saveScroll);


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
      this._siteBodyElement.classList.add('hide-overflow');
      this._siteBodyElement.scrollTop = this._scrollPosition;
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);

  }

  _getCommentsFilm(film) {
    const commentsIds = film.comments;
    return this._comments.filter((comment) => commentsIds.includes(comment.id));
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode === Mode.DEFAULT) {
      this._closePopupFilm();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== FilterType.FAVORITES ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ), this._comments,
    );
    this._siteBodyElement.scrollTop = this._scrollPosition;
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== FilterType.WATCHLIST ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ), this._comments,
    );
    this._siteBodyElement.scrollTop = this._scrollPosition;
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== FilterType.HISTORY ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ), this._comments,
    );
    this._siteBodyElement.scrollTop = this._scrollPosition;
  }

  _handleOpenClick() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._onEscKeyDown);
    this._siteBodyElement.classList.add('hide-overflow');
  }

  _handleCloseClick() {
    this._closePopupFilm();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPopupFilm() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    render(this._siteBodyElement, this._popupComponent, InsertPlace.BEFORE_END);

    this._mode = Mode.POPUP;
    this._changeMode();

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

  _restoreHandlers() {
    this._popupComponent.setClickHandler(this._handleCloseClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
  }
  // пыталась записать таким способом данные скролла, он добавляется, но на следующем шаге сбрасывается

  _saveScroll(scrollPosition) {
    this._scrollPosition = scrollPosition;
  }

}
