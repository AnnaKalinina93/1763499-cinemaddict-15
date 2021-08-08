import { createElement } from '../utils/render';
const filmListContainer = () => (
  `<div class="films-list__container">
  </div>`
);
export default class SiteFilmListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return filmListContainer();
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
