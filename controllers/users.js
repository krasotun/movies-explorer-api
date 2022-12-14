const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const DuplicateDataError = require('../errors/duplicate-data-error');
const { BAD_REQ_MSG, DUPLICATE_DATA_MSG, VAL_ERR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

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
      if (error.name === VAL_ERR) {
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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};
const getCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};
const changeCurrentUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ id: userId }, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === VAL_ERR) {
        throw new BadRequestError(BAD_REQ_MSG);
      } else if (error.code === 11000) {
        throw new DuplicateDataError(DUPLICATE_DATA_MSG);
      }
      next(error);
    })
    .catch(next);
};

module.exports = {
  createUser, login, getCurrentUserInfo, changeCurrentUserInfo,
};
