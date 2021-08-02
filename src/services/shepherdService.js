require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Shepherd, PrayerGroup } = require('../models');

const generateErrorMessage = (code, message) => ({ error: { code, message } });

const create = async ({ name, email, password, role, rule, prayerGroupId }) => {
  const userAlreadyExist = await Shepherd.findOne({ where: { email } });

  if (userAlreadyExist) {
    return generateErrorMessage('user_already_exist', 'User already exist');
  }

  const sheperd = await Shepherd
    .create({ name, email, password, role, rule, prayerGroupId });

    return sheperd;
};

const getAll = async () => Shepherd.findAll({
    include: [
      { model: PrayerGroup, as: 'prayerGroup' },
    ],
  });

const login = async (email, password) => {
  const sheperd = await Shepherd.findOne({
    where: { email, password },
    attributes: { exclude: ['password'] },
  });

  if (!sheperd) return generateErrorMessage('user_not_found', 'User not found');

  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const { id } = sheperd.dataValues;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = {
  login,
  getAll,
  create,
};