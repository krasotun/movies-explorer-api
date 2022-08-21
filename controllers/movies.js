const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const DuplicateDataError = require('../errors/duplicate-data-error');
const NotFoundError = require('../errors/duplicate-data-error');
const {
  BAD_REQ_MSG, DUPLICATE_DATA_MSG, VAL_ERR, NOT_FOUND_ERR, CAST_ERR,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      if (error.name === VAL_ERR) {
        throw new BadRequestError(BAD_REQ_MSG);
      } else if (error.code === 11000) {
        throw new DuplicateDataError(DUPLICATE_DATA_MSG);
      }
    })
    .catch(next);
};
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => {
      if (error.name === CAST_ERR) {
        throw new NotFoundError(NOT_FOUND_ERR);
      }
      next(error);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
};
