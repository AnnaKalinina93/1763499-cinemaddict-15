import AbstractView from './abstract';
import { RankType } from '../const';

const createHeaderTemplate = (filters) => {
  const historyFilmCount = filters[2].count;
  let rank = null;
  if (historyFilmCount <= 10 && historyFilmCount > 0) {
    rank = RankType.NOVICE;
  }
  if (historyFilmCount <= 20 && historyFilmCount > 10) {
    rank = RankType.FAN;
  }
  if (historyFilmCount > 20) {
    rank = RankType.MOVIE_BUFF;
  }
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Header extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createHeaderTemplate(this._filters);
  }

}
