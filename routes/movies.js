const moviesRouter = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateMoviesPost, validateMoviesDelete } = require('../middlewares/validator');

moviesRouter.post('/movies', validateMoviesPost, createMovie);
moviesRouter.get('/movies', getMovies);
moviesRouter.delete('/movies/:movieId', validateMoviesDelete, deleteMovie);

module.exports = moviesRouter;
