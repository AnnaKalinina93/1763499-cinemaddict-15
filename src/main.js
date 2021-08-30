import HeaderView from './view/header.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import FilmsModel from './model/films.js';
//import MenuView from './view/menu.js';
//import CommentsModel from './model/comments.js';
import FilterModel from './model/filters.js';

const COUNT = 15;
const films = new Array(COUNT).fill().map(generateData);
const filmsModel = new FilmsModel();
//const commentsModel = new CommentsModel();
//commentsModel.setComments(comments);
filmsModel.setFilms(films);
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const pagePresenter = new PagePresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);

filterPresenter.init();
pagePresenter.init();

