import FilmsModel from '../model/films.js';
//import CommentsModel from '../model/comments.js';
import { isOnline } from '../utils/common.js';

// const getSyncedFilms = (items) =>
//   items
//     .filter(({ success }) => success)
//     .map(({ payload }) => payload.film);

const createStoreStructure = (items) =>
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => comments);
      //   const items = createStoreStructure(comments.map(CommentsModel.adaptToServer));
      //   this._store.setItems(items);
      //   return comments;
      // });
    }

    // const storeComments = Object.values(this._store.getItems());

    // return Promise.resolve(storeComments.map(CommentsModel.adaptToClient));
    return Promise.reject(new Error('Get comments failed'));
  }

  addComment(film, comment) {
    if (isOnline()) {
      return this._api.addComment(film, comment)
        .then((data) => {
          this._store.setItem(data.film.id, FilmsModel.adaptToServer(data.film));
          // this._store.setItem(data.comments.id, data.comments.map(CommentsModel.adaptToClient));
          return data;
        });
    }

    return Promise.reject(new Error('Add comment failed'));
  }

  deleteComment(comment) {
    if (isOnline()) {
      return this._api.deleteComment(comment);
      //  .then(() => this._store.removeItem(comment.id));
    }

    return Promise.reject(new Error('Delete comment failed'));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          // const createdFilms = response.created? getSyncedFilms(response.created): null;
          const updatedFilms = response.updated;

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}

