const jwt = require('jsonwebtoken');
const AuthorisationErr = require('../errors/AuthorisationErr_401');
const { ERRORS, secretKey } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorisationErr(ERRORS.AUTH));
    return;
  }
  const token = authorization.replace(/^\S+/, '').trim();

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new AuthorisationErr(ERRORS.AUTH));
    return;
  }
  req.user = payload;
  next();
};
