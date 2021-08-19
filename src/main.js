import HeaderView from './view/header.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';
import PagePresenter from './presenter/page.js';

const COUNT = 15;
const films = new Array(COUNT).fill().map(generateData);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const pagePresenter = new PagePresenter(siteMainElement);

render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);
pagePresenter.init(films);

