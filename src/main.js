import HeaderView from './view/header.js';
import { render, InsertPlace, remove } from './utils/render.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filters.js';
import StatisticsView from './view/stats.js';
import { FilterType, UpdateType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic od145nrzbxy';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const pagePresenter = new PagePresenter(siteMainElement, filmsModel, filterModel, commentsModel, api);
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
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
