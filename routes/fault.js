const NotFoundError = require('../errors/NotFoundErr_404');
const { ERRORS } = require('../utils/constants');

module.exports = (req, res, next) => {
  next(new NotFoundError(ERRORS.INCORRECT_REQUEST));
};
