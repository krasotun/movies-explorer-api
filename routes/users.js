const usersRouter = require('express').Router();
const { getCurrentUserInfo, changeCurrentUserInfo } = require('../controllers/users');
const { validateUsersPatch } = require('../middlewares/validator');

usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.patch('/users/me', validateUsersPatch, changeCurrentUserInfo);

module.exports = usersRouter;
