const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');
const {
  PORT, DB_ADDRESS, SRV_SIDE_ERR, ALLOWED_DOMAINS,
} = require('./utils/constants');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const errorRouter = require('./routes/error');
const loginRouter = require('./routes/login');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimit');

const app = express();

app.use(cors({
  origin: ALLOWED_DOMAINS,
}));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(rateLimiter);

app.use('/', loginRouter);

app.use(auth);
app.use('/', usersRouter);
app.use('/', moviesRouter);

app.all('*', errorRouter);

app.use(errorLogger);
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
