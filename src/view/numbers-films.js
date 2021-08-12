/* eslint-disable quotes */
import AbstractView from './abstract';
const createNumbersFilmsTemplate = (films) => (
  `<p>${films.length} movies inside</p>`
);
export default class NumbersFilms extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createNumbersFilmsTemplate(this._films);
  }
}


