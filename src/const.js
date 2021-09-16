/* eslint-disable camelcase */
export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENTS: 'ADD_COMMENTS',
  DELETE_COMMENTS: 'DELETE_COMMENTS',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

const FilterType = {
  ALL: 'all',
  FAVORITES: 'favorites',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  STATISTICS: 'statistics',
};

const RankType = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff',
};

const CurrentType = {
  All: 'allTime',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export {
  UserAction,
  UpdateType,
  Mode,
  FilterType,
  RankType,
  CurrentType
};
