import HeaderView from './view/header.js';
import { generateData } from './mock/data-film.js';
import { render, InsertPlace , remove} from './utils/render.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filters.js';
import { getComments } from './mock/comments.js';
import StatisticsView from './view/stats.js';
import { FilterType } from './const.js';

const COUNT = 40;
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
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, handleSiteMenuClick);
render(siteHeaderElement, new HeaderView().getElement(), InsertPlace.BEFORE_END);
filterPresenter.init();
const staticElement = new StatisticsView();
pagePresenter.init();

function handleSiteMenuClick(filterType) {
  if (filterType === FilterType.STATISTICS) {
    render(siteMainElement, staticElement, InsertPlace.BEFORE_END);
    staticElement.init(filmsModel);
    pagePresenter.hide();
    staticElement.setData();
    return;
  }
  pagePresenter.show();
  remove(staticElement);

}
