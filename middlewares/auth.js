const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { NEED_AUTH_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(NEED_AUTH_MSG);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new AuthError(NEED_AUTH_MSG);
  }
  req.user = payload;
  next();
};
