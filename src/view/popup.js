import { getDayMonthFormat, getYearsFormat, getTimeFormat } from '../day.js';
import SmartView from './smart.js';
import { generateRuntime } from '../day.js';
import dayjs from 'dayjs';
import { UpdateType, UserAction } from '../const.js';
import { nanoid } from 'nanoid';
import he from 'he';

const createCommentTemplate = (comment) => (
  ` <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src=${comment.emoji} width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment.text)}</p>
            <p class="film-details__comment-info" >
              <span class="film-details__comment-author">${comment.avtor}</span>
              <span class="film-details__comment-day">${comment.dueDate}</span>
              <button class="film-details__comment-delete" id=${comment.id}>Delete</button>
            </p>
          </div>
        </li>`
);

const createCommentsTemplate = (comments) => (
  `<ul class="film-details__comments-list" style="font-size:0" >
  ${comments.map((comment) => createCommentTemplate(comment))}
  </ul>`
);

const createEmojiTemplate = (newComment) => (
  ` <img src=${newComment.emoji} width="55" height="55" alt="emoji-smile">`
);

const createNewCommentTemplate = (newComment) => (
  ` <div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">${newComment.emoji ? createEmojiTemplate(newComment) : ''}</div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.text ? newComment.text : ''}</textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>`
);

const createPopupTemplate = (data, newComment, correctComments) => {
  const {
    comments,
    isComments,
    filmInfo: {
      title,
      totalRating,
      poster,
      alternativeTitle,
      ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        releaseCountry,
      },
      runTime,
      genres,
      description,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
  } = data;

  const watchlistClassName = watchlist
    ? 'film-details__control-button--active'
    : '';
  const watchedClassName = alreadyWatched
    ? 'film-details__control-button--active'
    : '';
  const favoritesClassName = favorite
    ? 'film-details__control-button--active'
    : '';
  const isGenres = genres.length === 1
    ? 'Genre'
    : 'Genres';
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getDayMonthFormat(date)} ${getYearsFormat(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${generateRuntime(runTime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${isGenres}</td>
              <td class="film-details__cell" style="font-size:0">
              ${genres.map((genre) => `<span class="film-details__genre" style="font-size:21px">${genre}</span>`)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoritesClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      ${isComments ? createCommentsTemplate(correctComments) : ''}
      ${createNewCommentTemplate(newComment)}
      </section>
    </div>
  </form>
</section>`;
};
export default class Popup extends SmartView {
  constructor(film, changeData, comments, scroll, saveScroll) {
    super();
    this._comments = comments;
    this._scrollPosition = scroll;
    this._data = Popup.parseFilmToData(film);
    this._newComment = {};
    this._changeData = changeData;
    this._saveScroll = saveScroll;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);
    this._emojiHandler = this._emojiHandler.bind(this);
    this._sendCommentHandler = this._sendCommentHandler.bind(this);
    this._deleteCommentHandlers = this._deleteCommentHandlers.bind(this);
    this._scrollHandler= this._scrollHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._newComment, this._comments);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._newComment = {};
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    //this._scrollPosition = this.getElement().scrollTop;
    evt.preventDefault();
    this._saveScroll(this._scrollPosition);
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    //this._scrollPosition = this.getElement().scrollTop;
    evt.preventDefault();
    this._saveScroll(this._scrollPosition);
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    // this._scrollPosition = this.getElement().scrollTop;
    evt.preventDefault();
    this._saveScroll(this._scrollPosition);
    this._callback.alreadyWatchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  // парсим входные данные

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        isComments: film.comments.length !== 0,
      },
    );
  }


  static parseDataToFilm(data) {

    data = Object.assign({}, data);

    if (!data.isComments) {
      data.comments = [];
    }

    delete data.isComments;

    return data;
  }

  _updateNewComment(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._newComment = Object.assign(
      {},
      this._newComment,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
    document.addEventListener('keydown', this._sendCommentHandler);
    const buttons = this.getElement().querySelectorAll('.film-details__comment-delete');
    Array.from(buttons).forEach((button) => button.addEventListener('click', this._deleteCommentHandlers));
    this.getElement().addEventListener('scroll',this._scrollHandler);
  }

  _textInputHandler(evt) {
    evt.preventDefault();
    this.updateData(
      Object.assign(
        {},
        this._data,
        {
          isComments: this._data.comments.length !== 0,
        },
      ), true);

    this._updateNewComment(
      Object.assign(
        {},
        this._newComment,
        {
          text: evt.target.value,
        },
      ), true);

  }

  _emojiHandler(evt) {
    // this._scrollPosition = this.getElement().scrollTop;
    evt.preventDefault();
    this.updateData(
      Object.assign(
        {},
        this._data,
        {
          isComments: this._data.comments.length !== 0,
        },
      ), true);
    this._updateNewComment(
      Object.assign(
        {},
        this._newComment,
        {
          emoji: `images/emoji/${evt.target.value}.png`,
        },
      ));
    this.getElement().scrollTop = this._scrollPosition;
  }

  // отправка комментария

  _sendCommentHandler(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();
      if (this._newComment.emoji || this._newComment.text) {
        //   this._scrollPosition = this.getElement().scrollTop;
        this._createNewCooment();
        const comments = this._data.comments;
        comments[comments.length] = this._newComment.id;
        this._data = Popup.parseDataToFilm(this._data);
        this._changeData(UserAction.ADD_COMMENTS, UpdateType.PATCH, this._data, this._newComment, this._scrollPosition);
        this._newComment = {};
      }
    }
  }

  _createNewCooment() {
    const dueDate = dayjs();
    this._updateNewComment(
      Object.assign(
        {},
        this._newComment,
        {
          id: nanoid(),
          avtor: 'Anna',
          dueDate: `${getDayMonthFormat(dueDate)} ${getTimeFormat(dueDate)}`,
        },
      ), true);
  }
  // удаляем комментарии

  _deleteCommentHandlers(evt) {
    evt.preventDefault();
    //this._scrollPosition = this.getElement().scrollTop;
    const comments = this._delete(this._data.comments, evt.target.id);
    this._data = Popup.parseDataToFilm(this._data);
    const index = this._comments.findIndex((comment) => comment.id === evt.target.id);
    this._changeData(UserAction.DELETE_COMMENTS, UpdateType.PATCH, this._data, this._comments[index], this._scrollPosition);
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._data,
        {
          comments: comments,
        },
      ), this._comments, this._scrollPosition);

  }

  _delete(comments, update) {
    const index = comments.findIndex((comment) => comment === update);
    return [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];
  }

  _scrollHandler(evt) {
    evt.preventDefault();
    this._scrollPosition= evt.target.offsetHeight;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }
}

