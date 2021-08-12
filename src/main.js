import HeaderView from './view/header.js';
import SiteSortView from './view/sort.js';
import ButtonView from './view/button.js';
import MenuView from './view/menu.js';
import FilmView from './view/film.js';
import SiteFilmsContainerView from './view/films-container.js';
import NameFilmListView from './view/name-film-list.js';
import FilmListContainerView from './view/film-list-container.js';
import AdditionalContainerView from './view/additional-container.js';
import PopupView from './view/popup.js';
import NumbersFilmsView from './view/numbers-films.js';
import NoFilmsView from './view/no-films.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';
import { isEscape } from './utils/common.js';

const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';
const COUNT = 15;
const COUNT_PER_STEP = 5;
const films = new Array(COUNT).fill().map(generateData);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsContainer = new SiteFilmsContainerView();
const nameFilmListElement = new NameFilmListView();
const filmListContainer = new FilmListContainerView;
const showMoreButton = new ButtonView();
const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const popupComponent = new PopupView(film);
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
    if (isEscape(evt)) {
      evt.preventDefault();
      closePopupFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  filmComponent.setClickHandlerTitle(() => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  filmComponent.setClickHandlerPoster(() => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  filmComponent.setClickHandlerCommens(() => {
    openPopupFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  popupComponent.setClickHandler(() => {
    closePopupFilm();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};
render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);
render(siteMainElement, new MenuView(films).getElement(), InsertPlace.BEFORE_END);
render(siteMainElement, new SiteSortView().getElement(), InsertPlace.BEFORE_END);

render(siteMainElement, filmsContainer.getElement(), InsertPlace.BEFORE_END);
if (!films.length) {
  render(filmsContainer.getElement(), new NoFilmsView().getElement(), InsertPlace.BEFORE_END);
} else {
  render(filmsContainer.getElement(), nameFilmListElement.getElement(), InsertPlace.BEFORE_END);

  render(nameFilmListElement.getElement(), filmListContainer.getElement(), InsertPlace.BEFORE_END);
  films
    .slice(0, Math.min(films.length, COUNT_PER_STEP))
    .forEach((film) => renderFilm(filmListContainer.getElement(), film));

  if (films.length > COUNT_PER_STEP) {
    let renderedCount = COUNT_PER_STEP;
    render(nameFilmListElement.getElement(), showMoreButton.getElement(), InsertPlace.BEFORE_END);
    showMoreButton.setClickHandler(() => {
      films
        .slice(renderedCount, renderedCount + COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainer.getElement(), film));


      renderedCount += COUNT_PER_STEP;

      if (renderedCount >= films.length) {
        showMoreButton.getElement().remove();
      }
    });
  }

  const topAdditionalContainer = new AdditionalContainerView(TOP_NAME);
  const topFilmListContainer = new FilmListContainerView();
  render(filmsContainer.getElement(), topAdditionalContainer.getElement(), InsertPlace.BEFORE_END);
  render(topAdditionalContainer.getElement(), topFilmListContainer.getElement(), InsertPlace.BEFORE_END);
  const topFilms = [...films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  for (let i = 1; i <= 2; i++) {
    renderFilm(topFilmListContainer.getElement(), topFilms[i]);
  }
  const commentedAdditionalContainer = new AdditionalContainerView(MOST_COMMENTED_NAME);
  const commentedFilmListContainer = new FilmListContainerView();
  render(filmsContainer.getElement(), commentedAdditionalContainer.getElement(), InsertPlace.BEFORE_END);
  render(commentedAdditionalContainer.getElement(), commentedFilmListContainer.getElement(), InsertPlace.BEFORE_END);
  const mostCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
  for (let i = 1; i <= 2; i++) {
    renderFilm(commentedFilmListContainer.getElement(), mostCommentedFilms[i]);
  }
}
const siteFooterElement = document.querySelector('.footer');
const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterSectionElement, new NumbersFilmsView(films).getElement(), InsertPlace.BEFORE_END);


