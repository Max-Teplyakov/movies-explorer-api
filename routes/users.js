const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateProfileUser,
} = require('../controllers/users');
const { REG_EMAIL } = require('../utils/utils');

router.get('/users/me', getUser);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string()
        .required()
        .pattern(REG_EMAIL),
    }),
  }),
  updateProfileUser,
);

module.exports = router;
