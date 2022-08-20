const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const DuplicateDataError = require('../errors/duplicate-data-error');
const { BAD_REQ_MSG, DUPLICATE_DATA_MSG } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((data) => {
      res.status(200).send({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQ_MSG);
      } else if (error.code === 11000) {
        throw new DuplicateDataError(DUPLICATE_DATA_MSG);
      }
      next(error);
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((data) => {
      res.status(200).send({
        email: data.email,
        name: data.name,
      });
    })
    .catch(next);
};

module.exports = {
  createUser, login, getCurrentUser,
};
