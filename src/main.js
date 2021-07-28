import { createLogoTemplate } from './view/logo.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortTemplate } from './view/sort.js';
import { createFilmTemplate } from './view/films.js';
import { createFilmsContainer } from './view/filmcontainer.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteLogoHeaderElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');

render(siteLogoHeaderElement, createLogoTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsContainer(), 'beforeend');

const siteSectionElement = siteMainElement.querySelector('.films-list');
const siteDivContainerElement = siteSectionElement.querySelector('.films-list__container');
for (let i = 1; i <= 5; i++) {
  render(siteDivContainerElement, createFilmTemplate(), 'beforeend');
}

