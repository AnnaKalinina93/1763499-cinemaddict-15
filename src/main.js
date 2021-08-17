import HeaderView from './view/header.js';
import MenuView from './view/menu.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';

const COUNT = 15;
const films = new Array(COUNT).fill().map(generateData);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const movieListPresenter = new MovieListPresenter(siteMainElement);

render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);
render(siteMainElement, new MenuView(films).getElement(), InsertPlace.BEFORE_END);
movieListPresenter.init(films);

