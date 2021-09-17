import { render, InsertPlace, remove } from './utils/render.js';
import { toast } from './utils/toast.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filter.js';
import StatisticsView from './view/statistics.js';
import { FilterType, UpdateType } from './const.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic od145nrzbxy';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);
const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v15';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const pagePresenter = new PagePresenter(siteMainElement, filmsModel, filterModel, commentsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, handleSiteMenuClick, siteHeaderElement);
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
apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});
window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  toast('You are offline');
});
