const usersRouter = require('express').Router();
const { getCurrentUser } = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUser);

module.exports = usersRouter;
