import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, film, comments) {
    this._comments = comments.slice();
    this._notify(updateType, film);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update, comments, scroll) {
    this._comments = [
      ...this._comments,
      comments,
    ];

    this._notify(updateType, update, this._comments, scroll);
  }

  deleteComment(updateType, update, comments, scroll) {
    const index = this._comments.findIndex((comment) => comment.id === comments.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType, update, this._comments, scroll);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        text: comment['comment'],
        emoji: comment['emotion'],
        dueDate: comment['date'],
        avtor: comment['author'],
      });
    delete adaptedComment['comment'];
    delete adaptedComment['emotion'];
    delete adaptedComment['date'];
    delete adaptedComment['author'];
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        'comment': comment.text,
        'emotion': comment.emoji,
      });
    delete adaptedComment.text;
    delete adaptedComment.emoji;
    return adaptedComment;
  }
}
