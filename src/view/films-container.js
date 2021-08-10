import { createElement } from '../utils/render';
const createFilmsContainer = () => (
  `<section class="films">
   </section>`
);
export default class SiteFilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer();
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
