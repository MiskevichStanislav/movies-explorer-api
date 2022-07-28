const Movie = require('../models/movie');
const { ERRORS } = require('../utils/constants');
const ValidationError = require('../errors/ValidationErr_400');
const NotFoundError = require('../errors/NotFoundErr_404');
const ForbiddenError = require('../errors/ForbiddenErr_403');

const getFilms = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((films) => {
      res.send(films);
    })
    .catch((err) => next(err));
};

const createFilm = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(ERRORS.MOVIE.INCORRECT_DATA));
      }

      next(err);
    });
};

const deleteFilm = (req, res, next) => {
  const filmId = req.params.id;
  const userId = req.user._id.toString();

  Movie.findById(filmId)
    .then((film) => {
      if (!film) throw new NotFoundError(ERRORS.MOVIE.NOT_FOUND);

      const ownerFilmId = film.owner.toString();
      if (ownerFilmId !== userId) throw new ForbiddenError(ERRORS.MOVIE.NO_ACCESS_RIGHTS);

      return Movie.findByIdAndDelete(filmId);
    })
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError(ERRORS.MOVIE.ID));
        return;
      }
      next(err);
    });
};

module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};
