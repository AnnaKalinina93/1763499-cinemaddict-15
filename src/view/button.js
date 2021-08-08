/* eslint-disable quotes */
import { createElement } from '../utils/render';

const createButtonTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);
export default class SiteButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonTemplate();
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
