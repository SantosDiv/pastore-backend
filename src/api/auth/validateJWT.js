require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const { JWT_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ statusCode: 401, message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User
      .findByPk(decoded.userData.id, {
        attributes: { exclude: ['password'] },
      });

    if (!user) return next({ statusCode: 404, message: 'User does not exist' });

    req.user = user;
    next();
  } catch (error) {
    next({ statusCode: 404, message: error.message });
  }
};