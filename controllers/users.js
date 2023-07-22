const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const {
  ERROR_SERVER,
  OK_SERVER,
} = require('../utils/utils');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const UserDeletePassword = user.toObject();
      delete UserDeletePassword.password;
      res.status(OK_SERVER).send({ data: UserDeletePassword });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new ValidationError('Error Data')); }
      if (err.code === 11000) { return next(new ConflictError('Email Already Exists')); }
      return res.status(ERROR_SERVER).send({ message: 'Error Server' });
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(OK_SERVER).send(user);
    })
    .catch(next);
};

module.exports.updateProfileUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(OK_SERVER).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new ValidationError('Data is not corected')); }
      return next(err);
    });
};
