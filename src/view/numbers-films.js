/* eslint-disable quotes */
import { createElement } from '../utils/render';
const createNumbersFilmsTemplate = (films) => (
  `<p>${films.length} movies inside</p>`
);
export default class NumbersFilms {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createNumbersFilmsTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


