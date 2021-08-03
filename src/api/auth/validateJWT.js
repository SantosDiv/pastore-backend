require('dotenv').config();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { Shepherd, PrayerGroup } = require('../../models');

const { JWT_SECRET } = process.env;

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ statusCode: 401, message: 'Token not found' });

  const decoded = jwt.decode(token, JWT_SECRET);

  const shepherd = await Shepherd
    .findByPk(decoded.id, {
      include: [{ model: PrayerGroup, as: 'prayerGroup' }],
      attributes: { exclude: ['password'] },
    });

  if (!shepherd) return next({ statusCode: 404, message: 'User does not exist' });

  req.user = shepherd;
  next();
});