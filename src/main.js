import SiteLogoView from './view/logo.js';
import SiteSortView from './view/sort.js';
import SiteButtonView from './view/button.js';
import SiteMenuView from './view/menu.js';
import SiteFilmCardView from './view/film.js';
import SiteFilmsContainerView from './view/film-container.js';
import SiteNameFilmListView from './view/name-film-list.js';
import SiteFilmListContainerView from './view/film-list-container.js';
import SiteAdditionalContainerView from './view/additional-containers.js';
import SitePopupView from './view/popup.js';
import SiteNumbersFilmsView from './view/numbers-films.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';


const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';
const COUNT = 15;
const COUNT_PER_STEP = 5;
const films = new Array(COUNT).fill().map(generateData);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsContainer = new SiteFilmsContainerView();
const nameFilmListElement = new SiteNameFilmListView();
const filmListContainer = new SiteFilmListContainerView;
const showMoreButton = new SiteButtonView();
const renderFilm = (filmListElement, film) => {
  const filmComponent = new SiteFilmCardView(film);
  const popupComponent = new SitePopupView(film);
  const siteBodyElement = document.querySelector('body');
  render(filmListElement, filmComponent.getElement(), InsertPlace.BEFORE_END);
  const openPopupFilm = () => {
    siteBodyElement.classList.add('hide-overflow');
    render(siteBodyElement, popupComponent.getElement(), InsertPlace.BEFORE_END);
  };
  const closePopupFilm = () => {
    siteBodyElement.classList.remove('hide-overflow');
    popupComponent.getElement().remove();

  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopupFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    closePopupFilm();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};
render(siteHeaderElement, new SiteLogoView().getElement(), InsertPlace.BEFORE_END);
render(siteMainElement, new SiteMenuView(films).getElement(), InsertPlace.BEFORE_END);
render(siteMainElement, new SiteSortView().getElement(), InsertPlace.BEFORE_END);

render(siteMainElement, filmsContainer.getElement(), InsertPlace.BEFORE_END);
render(filmsContainer.getElement(), nameFilmListElement.getElement(), InsertPlace.BEFORE_END);
render(nameFilmListElement.getElement(), filmListContainer.getElement(), InsertPlace.BEFORE_END);
films
  .slice(0, Math.min(films.length, COUNT_PER_STEP))
  .forEach((film) => renderFilm(filmListContainer.getElement(), film));

if (films.length > COUNT_PER_STEP) {
  let renderedCount = COUNT_PER_STEP;
  render(nameFilmListElement.getElement(), showMoreButton.getElement(), InsertPlace.BEFORE_END);
  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCount, renderedCount + COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainer.getElement(), film));


    renderedCount += COUNT_PER_STEP;

    if (renderedCount >= films.length) {
      showMoreButton.getElement().remove();
    }
  });
}

const topAdditionalContainer = new SiteAdditionalContainerView(TOP_NAME);
const topFilmListContainer = new SiteFilmListContainerView();
render(filmsContainer.getElement(), topAdditionalContainer.getElement(), InsertPlace.BEFORE_END);
render(topAdditionalContainer.getElement(), topFilmListContainer.getElement(), InsertPlace.BEFORE_END);
const topFilms = [...films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
for (let i = 1; i <= 2; i++) {
  renderFilm(topFilmListContainer.getElement(), topFilms[i]);
}
const commentedAdditionalContainer = new SiteAdditionalContainerView(MOST_COMMENTED_NAME);
const commentedFilmListContainer = new SiteFilmListContainerView();
render(filmsContainer.getElement(), commentedAdditionalContainer.getElement(), InsertPlace.BEFORE_END);
render(commentedAdditionalContainer.getElement(), commentedFilmListContainer.getElement(), InsertPlace.BEFORE_END);
const mostCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
for (let i = 1; i <= 2; i++) {
  renderFilm(commentedFilmListContainer.getElement(), mostCommentedFilms[i]);
}

const siteFooterElement = document.querySelector('.footer');
const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterSectionElement, new SiteNumbersFilmsView(films).getElement(), InsertPlace.BEFORE_END);


