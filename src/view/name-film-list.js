import AbstractView from './abstract';
const createNameFilmListTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
   </section>`
);
export default class NameFilmList  extends AbstractView {
  getTemplate() {
    return createNameFilmListTemplate();
  }
}
