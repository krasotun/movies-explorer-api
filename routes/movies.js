const moviesRouter = require('express').Router();
const { createMovie, getMovies } = require('../controllers/movies');

moviesRouter.post('/movies', createMovie);
moviesRouter.get('/movies', getMovies);

module.exports = moviesRouter;
