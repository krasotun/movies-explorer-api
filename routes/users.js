const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUserInfo, changeCurrentUserInfo } = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  changeCurrentUserInfo,
);

module.exports = usersRouter;
