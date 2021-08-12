import AbstractView from './abstract';

const createAdditionalContainer = (listName) => (
  `<section class="films-list films-list--extra">
     <h2 class="films-list__title">${listName}</h2>
   </section> `
);
export default class AdditionalContainer extends AbstractView {
  constructor(listName) {
    super();
    this._listName = listName;
  }

  getTemplate() {
    return createAdditionalContainer(this._listName);
  }
}
