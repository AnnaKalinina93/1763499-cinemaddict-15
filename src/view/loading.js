import AbstractView from './abstract.js';

const createNoTaskTemplate = () => (
  `<section class="films-list">
  <p class="board__no-tasks">
    Loading...
  </p>
</section>`
);

export default class Loading extends AbstractView {

  getTemplate() {
    return createNoTaskTemplate();
  }

}
