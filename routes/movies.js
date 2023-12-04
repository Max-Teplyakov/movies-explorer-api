const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { REG_URL } = require('../utils/utils');

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(
          REG_URL,
        ),
      trailerLink: Joi.string()
        .required()
        .pattern(
          REG_URL,
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          REG_URL,
        ),
      movieId: Joi.number().integer().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).required().hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
