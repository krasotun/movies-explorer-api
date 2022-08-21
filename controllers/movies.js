const Movie = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const DuplicateDataError = require('../errors/duplicate-data-error');
const { BAD_REQ_MSG, DUPLICATE_DATA_MSG, VAL_ERR } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log(error);
      if (error.name === VAL_ERR) {
        throw new BadRequestError(BAD_REQ_MSG);
      } else if (error.code === 11000) {
        throw new DuplicateDataError(DUPLICATE_DATA_MSG);
      }
    })
    .catch(next);
};

module.exports = {
  createMovie,
};
