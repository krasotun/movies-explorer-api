const errorRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND_ERR } = require('../utils/constants');

errorRouter.all('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR));
});
module.exports = errorRouter;
