const rescue = require('express-rescue');

const admin = 'admin';

module.exports = rescue(async (req, _res, next) => {
  const { admin } = req.user;

  if (!admin) {
    return next({ statusCode: 401, message: 'Unauthorized user' });
  }

  next();
});