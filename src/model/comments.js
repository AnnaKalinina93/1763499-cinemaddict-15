import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  // getCommentsFilm(film, count) {
  //   return this._comments[count];
  // }
  //метод принять id фильма и вернуть комментарии к фильму
  /*
    updateComment(updateType, update) {
      const index = this._comments.findIndex((comment) => comment.id === update.id);

      if (index === -1) {
        throw new Error('Can\'t update unexisting comment');
      }

      this._comments = [
        ...this._comments.slice(0, index),
        update,
        ...this._comments.slice(index + 1),
      ];

      this._notify(updateType, update);
    }
  */

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
