const express = require('express');

const app = express();
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${3000}`);
});