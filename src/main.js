import { render } from './utils/render.js';
import { createLogoTemplate } from './view/logo.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortTemplate } from './view/sort.js';
import { createFilmTemplate } from './view/films.js';
import { createFilmsContainer } from './view/filmcontainer.js';
import { createButtonTemplate } from './view/button.js';
import { createAdditionalContainer } from './view/additional-containers.js';
import { createTopFilmTemplate } from './view/topFilms.js';
import { createMostCommentedFilmsTemplate } from './view/mostCommentedFilms.js';
import { createNumbersFilms } from './view/numbersFilms.js';
import { createPopupTemplate } from './view/popup.js';
import { generatePopupData } from './mock/popup-data.js';

const INSERT_PLACE = {
  beforeend: 'beforeend',
  afterend: 'afterend',
  beforebegin: 'beforebegin',
  afterbegin: 'afterbegin',
};
const TOP_NAME = 'Top rated';
const MOST_COMMENTED_NAME = 'Most commented';
const COUNT = 15;
const COUNT_PER_STEP = 5;
const films = new Array(COUNT).fill().map(generatePopupData);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
render(siteHeaderElement, createLogoTemplate(), INSERT_PLACE.beforeend);
render(siteMainElement, createMenuTemplate(films), INSERT_PLACE.beforeend);
render(siteMainElement, createSortTemplate(), INSERT_PLACE.beforeend);
render(siteMainElement, createFilmsContainer(), INSERT_PLACE.beforeend);
const siteSectionElement = siteMainElement.querySelector('.films');
const siteSectionFilmsElement = siteSectionElement.querySelector('.films-list');
const siteDivContainerElement = siteSectionFilmsElement.querySelector('.films-list__container');
for (let i = 1; i <= Math.min(films.length, COUNT_PER_STEP); i++) {
  render(siteDivContainerElement, createFilmTemplate(films[i - 1]), INSERT_PLACE.beforeend);
}
if (films.length > COUNT_PER_STEP) {
  let renderedCount = COUNT_PER_STEP;
  render(siteSectionFilmsElement, createButtonTemplate(), INSERT_PLACE.beforeend);

  const showMoreButton = siteSectionFilmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCount, renderedCount + COUNT_PER_STEP)
      .forEach((film) => render(siteDivContainerElement, createFilmTemplate(film), INSERT_PLACE.beforeend));

    renderedCount += COUNT_PER_STEP;

    if (renderedCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
render(siteSectionElement, createAdditionalContainer(TOP_NAME), INSERT_PLACE.beforeend);
const siteSectionTopFilmsElement = siteSectionElement.querySelector('.films-list--extra');
const siteTopDivContainerElement = siteSectionTopFilmsElement.querySelector('.films-list__container');
const topFilms = films.sort((a, b) => b.rating - a.rating);
for (let i = 1; i <= 2; i++) {
  render(siteTopDivContainerElement, createTopFilmTemplate(topFilms[i]), INSERT_PLACE.beforeend);
}
render(siteSectionElement, createAdditionalContainer(MOST_COMMENTED_NAME), INSERT_PLACE.beforeend);
const siteSectionFilmsElements = siteSectionElement.querySelectorAll('.films-list--extra');
const siteMostCommentedDivContainerElement = siteSectionFilmsElements[1].querySelector('.films-list__container');
const mostCommentedFilms =  films.sort((a, b) => b.comments.length - a.comments.length);
for (let i = 1; i <= 2; i++) {
  render(siteMostCommentedDivContainerElement, createMostCommentedFilmsTemplate(mostCommentedFilms[i]), INSERT_PLACE.beforeend);
}
const siteFooterElement = document.querySelector('.footer');
const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterSectionElement, createNumbersFilms(films), INSERT_PLACE.beforeend);
const siteBodyElement = document.querySelector('body');
render(siteBodyElement, createPopupTemplate(films[0]), INSERT_PLACE.beforeend);
const popupElement = siteBodyElement.querySelector('.film-details');
const popupCloseButton = popupElement.querySelector('.film-details__close-btn');
popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupElement.style.display='none';
});


