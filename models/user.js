const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-error');
const { USER_SCHEMA_REQ_MSGS, USER_SCHEMA_VAL_MSGS, AUTH_ERR_MSG } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, USER_SCHEMA_REQ_MSGS.EMAIL],
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VAL_MSGS.EMAIL}`,
    },
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA_REQ_MSGS.PASSWORD],
    select: false,
  },
  name: {
    type: String,
    required: [true, USER_SCHEMA_REQ_MSGS.NAME],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VAL_MSGS.NAME}`,
    },
  },
});
userSchema.statics.findUserByCredentials = function func(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(AUTH_ERR_MSG);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(AUTH_ERR_MSG);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
