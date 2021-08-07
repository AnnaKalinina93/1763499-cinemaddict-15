import { render } from './utils/render.js';
import { createLogoTemplate } from './view/logo.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortTemplate } from './view/sort.js';
import { createFilmTemplate } from './view/film.js';
import { createFilmsContainer } from './view/film-container.js';
import { createButtonTemplate } from './view/button.js';
import { createAdditionalContainer } from './view/additional-containers.js';
import { createNumbersFilms } from './view/numbers-films.js';
import { createPopupTemplate } from './view/popup.js';
import { generateData } from './mock/data-film.js';

const InsertPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
};
const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';
const COUNT = 15;
const COUNT_PER_STEP = 5;
const films = new Array(COUNT).fill().map(generateData);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
render(siteHeaderElement, createLogoTemplate(), InsertPlace.BEFORE_END);
render(siteMainElement, createMenuTemplate(films), InsertPlace.BEFORE_END);
render(siteMainElement, createSortTemplate(), InsertPlace.BEFORE_END);
render(siteMainElement, createFilmsContainer(), InsertPlace.BEFORE_END);
const siteSectionElement = siteMainElement.querySelector('.films');
const siteSectionFilmsElement = siteSectionElement.querySelector('.films-list');
const siteDivContainerElement = siteSectionFilmsElement.querySelector('.films-list__container');
for (let i = 1; i <= Math.min(films.length, COUNT_PER_STEP); i++) {
  render(siteDivContainerElement, createFilmTemplate(films[i - 1]),InsertPlace.BEFORE_END);
}
if (films.length > COUNT_PER_STEP) {
  let renderedCount = COUNT_PER_STEP;
  render(siteSectionFilmsElement, createButtonTemplate(),InsertPlace.BEFORE_END);

  const showMoreButton = siteSectionFilmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCount, renderedCount + COUNT_PER_STEP)
      .forEach((film) => render(siteDivContainerElement, createFilmTemplate(film),InsertPlace.BEFORE_END));

    renderedCount += COUNT_PER_STEP;

    if (renderedCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
render(siteSectionElement, createAdditionalContainer(TOP_NAME),InsertPlace.BEFORE_END);
const siteSectionTopFilmsElement = siteSectionElement.querySelector('.films-list--extra');
const siteTopDivContainerElement = siteSectionTopFilmsElement.querySelector('.films-list__container');
const topFilms = [...films].sort((a, b) => b.rating - a.rating);
for (let i = 1; i <= 2; i++) {
  render(siteTopDivContainerElement, createFilmTemplate(topFilms[i]), InsertPlace.BEFORE_END);
}
render(siteSectionElement, createAdditionalContainer(MOST_COMMENTED_NAME), InsertPlace.BEFORE_END);
const siteSectionFilmsElements = siteSectionElement.querySelectorAll('.films-list--extra');
const siteMostCommentedDivContainerElement = siteSectionFilmsElements[1].querySelector('.films-list__container');
const mostCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
for (let i = 1; i <= 2; i++) {
  render(siteMostCommentedDivContainerElement, createFilmTemplate(mostCommentedFilms[i]), InsertPlace.BEFORE_END);
}
const siteFooterElement = document.querySelector('.footer');
const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterSectionElement, createNumbersFilms(films), InsertPlace.BEFORE_END);
const siteBodyElement = document.querySelector('body');
render(siteBodyElement, createPopupTemplate(films[0]), InsertPlace.BEFORE_END);
const popupElement = siteBodyElement.querySelector('.film-details');
const popupCloseButton = popupElement.querySelector('.film-details__close-btn');
popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupElement.style.display = 'none';
});


