import AbstractView from './abstract';
const createfilmListContainer = () => (
  `<div class="films-list__container">
  </div>`
);
export default class FilmListContainer extends AbstractView {
  getTemplate() {
    return createfilmListContainer();
  }
}
