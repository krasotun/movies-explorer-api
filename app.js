const express = require('express');
const mongoose = require('mongoose');
const { PORT, DB_ADRESS } = require('./utils/constants');

const app = express();

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
});

app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});
