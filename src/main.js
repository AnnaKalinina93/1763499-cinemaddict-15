import { createLogoTemplate } from './view/logo.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortTemplate } from './view/sort.js';
import { createFilmTemplate } from './view/films.js';
import { createFilmsContainer } from './view/filmcontainer.js';
import { createButtonTemplate } from './view/button.js';
import { createTopContainer } from './view/topContainer.js';
import { createTopFilmTemplate } from './view/topFilms.js';
import { createMostCommentedContainer } from './view/mostCommentedContainer.js';
import { createMostCommentedFilmsTemplate } from './view/mostCommentedFilms.js';
import { createNumbersFilms } from './view/numbersFilms.js';
import { createPopupTemplate } from './view/popup.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
render(siteHeaderElement, createLogoTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsContainer(), 'beforeend');
const siteSectionElement = siteMainElement.querySelector('.films');
const siteSectionFilmsElement = siteSectionElement.querySelector('.films-list');
const siteDivContainerElement = siteSectionFilmsElement.querySelector('.films-list__container');
for (let i = 1; i <= 5; i++) {
  render(siteDivContainerElement, createFilmTemplate(), 'beforeend');
}
render(siteSectionFilmsElement, createButtonTemplate(), 'beforeend');
render(siteSectionElement, createTopContainer(), 'beforeend');
const siteSectionTopFilmsElement = siteSectionElement.querySelector('.films-list--extra');
const siteTopDivContainerElement = siteSectionTopFilmsElement.querySelector('.films-list__container');
for (let i = 1; i <= 2; i++) {
  render(siteTopDivContainerElement, createTopFilmTemplate(), 'beforeend');
}
render(siteSectionElement, createMostCommentedContainer(), 'beforeend');
const siteSectionFilmsElements = siteSectionElement.querySelectorAll('.films-list--extra');
const siteMostCommentedDivContainerElement = siteSectionFilmsElements[1].querySelector('.films-list__container');
for (let i = 1; i <= 2; i++) {
  render(siteMostCommentedDivContainerElement, createMostCommentedFilmsTemplate(), 'beforeend');
}
const siteFooterElement = document.querySelector('.footer');
const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterSectionElement, createNumbersFilms(), 'beforeend');
const siteBodyElement = document.querySelector ('body');
render(siteBodyElement, createPopupTemplate(), 'beforeend');
