import AbstractObserver from '../utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update, comments, scroll) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update, comments, scroll);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          title: film['film_info']['title'],
          alternativeTitle: film['film_info']['alternative_title'],
          totalRating:film['film_info']['total_rating'],
          poster: film['film_info']['poster'],
          ageRating: film['film_info']['age_rating'],
          director: film['film_info']['director'],
          writers: film['film_info']['writers'],
          actors: film['film_info']['actors'],
          release: {
            date: film['film_info']['release']['date'],
            releaseCountry: film['film_info']['release']['release_country'],
          },
          runTime: film['film_info']['runtime'],
          genres: film['film_info']['genre'],
          description: film['film_info']['description'],
        },
        userDetails: {
          watchlist: film['user_details']['watchlist'],
          alreadyWatched:film['user_details']['already_watched'] ,
          watchingDate:film['user_details']['watching_date'],
          favorite: film['user_details']['favorite'],
        },
      });

    // Ненужные ключи мы удаляем
    delete adaptedFilm['film-info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.filmInfo.title,
          'alternative_title': film.filmInfo.alternativeTitle,
          'total_rating':film.filmInfo.totalRating,
          'poster': film.filmInfo.poster,
          'age_rating': film.filmInfo.ageRating,
          'director': film.filmInfo.director,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'release': {
            'date': film.filmInfo.release.date,
            'release_country': film.filmInfo.release.releaseCountry,
          },
          'runtime': film.filmInfo.runTime,
          'genre': film.filmInfo.genres,
          'description': film.filmInfo.description,
        },
        'user_details': {
          'watchlist': film.userDetails.watchlist,
          'already_watched':film.userDetails.alreadyWatched ,
          'watching_date':film.userDetails.watchingDate,
          'favorite': film.userDetails.favorite,
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}
