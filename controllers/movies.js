const Movie = require('../models/movies');
const {
  OK_SERVER,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movie) => res.status(OK_SERVER).send(movie))
  .catch(next);

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const userId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(OK_SERVER).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new ValidationError('Error Data')); }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Movie not found');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You have no rights');
      }
      return Movie.findByIdAndRemove(movieId)
        .then((user) => {
          res.status(OK_SERVER).send(user);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') { return next(new ValidationError('Error Data')); }
      return next(err);
    });
};
