import AbstractView from './abstract';

const createMenuTemplate = (films) => {
  let watchlistCounter = 0;
  let historyCounter = 0;
  let favoritesCounter = 0;
  films.forEach((film) => {
    watchlistCounter = film.userDetails.watchlist ? watchlistCounter += 1 : watchlistCounter;
    historyCounter = film.userDetails.alreadyWatched ? historyCounter += 1 : historyCounter;
    favoritesCounter = film.userDetails.favorite ? favoritesCounter += 1 : favoritesCounter;
  });
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
     <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
     <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCounter}</span></a>
     <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCounter}</span></a>
     <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCounter}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
export default class Menu extends AbstractView {
  constructor(films) {
    super();
    this._filters = films;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
