const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { PORT, DB_ADDRESS, SRV_SIDE_ERR } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const { validateSignup, validateSignin } = require('./middlewares/validator');

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

app.use('/', auth, usersRouter);
app.use('/', auth, moviesRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? SRV_SIDE_ERR : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});
