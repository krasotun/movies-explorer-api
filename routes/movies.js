const moviesRouter = require('express').Router();
const { createMovie } = require('../controllers/movies');

moviesRouter.post('/movies', createMovie);

module.exports = moviesRouter;
