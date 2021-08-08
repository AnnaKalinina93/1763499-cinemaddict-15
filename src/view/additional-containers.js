import { createElement } from '../utils/render';

const createAdditionalContainer = (listName) => (
  `<section class="films-list films-list--extra">
     <h2 class="films-list__title">${listName}</h2>
   </section> `
);
export default class SiteAdditionalContainer {
  constructor(listName) {
    this._listName = listName;
    this._element = null;
  }

  getTemplate() {
    return createAdditionalContainer(this._listName);
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
