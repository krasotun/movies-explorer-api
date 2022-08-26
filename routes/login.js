const loginRouter = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateSignup, validateSignin } = require('../middlewares/validator');

loginRouter.post('/signup', validateSignup, createUser);
loginRouter.post('/signin', validateSignin, login);

module.exports = loginRouter;
