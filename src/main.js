import HeaderView from './view/header.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace } from './utils/render.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filters.js';
import { getComments } from './mock/comments.js';
import StatisticsView from './view/stats.js';
import { FilterType} from './const.js';
const COUNT = 15;
const films = new Array(COUNT).fill().map(generateData);
const idComments = films.map((film) => film.comments).flat();
const commentsArray = [];
idComments.forEach((id) => commentsArray.push(getComments(id)));


const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
commentsModel.setComments(commentsArray);
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const pagePresenter = new PagePresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const staticElement = new StatisticsView(films);
render(siteMainElement, staticElement, InsertPlace.BEFORE_END);
staticElement.setCharts();
staticElement.hide();
const handleSiteMenuClick = (filterType) => {
  if (filterType === FilterType.STATISTICS) {
    pagePresenter.hide();
    staticElement.show();
    return;
  }
  pagePresenter.show();
  staticElement.hide();

};
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, handleSiteMenuClick);
render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);

filterPresenter.init();
pagePresenter.init();

