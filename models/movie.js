const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { MOVIE_SCHEMA_REQ_MSGS, MOVIE_SCHEMA_VAL_MSGS } = require('../utils/constants');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.IMAGE],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VAL_MSGS.IMAGE_LINK}`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.TRAILER],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VAL_MSGS.TRAILER_LINK}`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.THUMBNAIL],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VAL_MSGS.THUMBNAIL_LINK}`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.MOVIEID],
  },

  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.NAMERU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQ_MSGS.NAMERU],
  },
});

module.exports = mongoose.model('movie', movieSchema);
