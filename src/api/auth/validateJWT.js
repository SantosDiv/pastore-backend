require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Shepherd } = require('../../models');

const { JWT_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ statusCode: 401, message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const shepherd = await Shepherd
      .findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

    if (!shepherd) return next({ statusCode: 404, message: 'User does not exist' });

    req.user = shepherd;
    next();
  } catch (error) {
    next({ statusCode: 404, message: error.message });
  }
};