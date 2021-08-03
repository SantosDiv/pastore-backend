const rescue = require('express-rescue');

const admin = 'admin';

module.exports = rescue(async (req, _res, next) => {
  const { rule } = req.user;

  if (rule !== admin) {
    return next({ statusCode: 401, message: 'Unauthorized user' });
  }

  next();
});