const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const { PORT, DB_ADRESS } = require('./utils/constants');
const { createUser } = require('./controllers/users');

const app = express();

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
});

app.use(express.json());

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});
