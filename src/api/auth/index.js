const validateJWT = require('./validateJWT');
const validateUserAdmin = require('./validateUserAdmin');
const validateSessionUser = require('./validateSessionUser');

module.exports = {
  validateJWT,
  validateUserAdmin,
  validateSessionUser,
}