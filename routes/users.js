const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateProfileUser,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/),
    }),
  }),
  updateProfileUser,
);

module.exports = router;
