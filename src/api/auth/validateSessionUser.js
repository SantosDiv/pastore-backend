const rescue = require('express-rescue');

module.exports = (rule) => rescue(async (req, _res, next) => {
  if (req.user.id === Number(req.params.id) || req.user.rule === rule) {
    return next();
  }

  return next({ statusCode: 401, message: 'Unauthorized user' });
});