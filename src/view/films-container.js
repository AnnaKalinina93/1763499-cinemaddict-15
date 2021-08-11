import AbstractView from './abstract';
const createFilmsContainer = () => (
  `<section class="films">
   </section>`
);
export default class SiteFilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainer();
  }
}
