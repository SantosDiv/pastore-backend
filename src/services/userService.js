require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, PrayerGroup, Attendence } = require('../models');
const errorsMessages = require('../utils/errorsMessages');
const { Op } = require('sequelize');
const { paginationConsts } = require('../utils/consts');

const generateErrorMessage = (objectError) => ({ error: objectError });

const create = async ({ name, username, password, role, admin = false, active = true, prayerGroupId }) => {
  const userAlreadyExist = await User.findOne({ where: { username } });

  if (userAlreadyExist) {
    return generateErrorMessage(errorsMessages.userAlreadyExist);
  }

  const user = await User
    .create({ name, username, password, role, admin, active, prayerGroupId });

  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const { id } = user.dataValues;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);

  return { token };
};

const update = async (data, id) => {
  const user = await User.findByPk(id);

  if (!user) return generateErrorMessage(errorsMessages.userNotFound);

  const response = await User.update({ ...data }, { where: { id } });

  return response;
};

const destroy = async (id) => {
  await User.destroy({ where: { id } });
  return { message: 'User deleted successfully' };
};

const getAll = async (page) => {
  const users = await User.findAll({
    limit: paginationConsts.SIZE,
    offset: page * paginationConsts.SIZE,
    attributes: { exclude: ['password'] },
    include: [
      { model: PrayerGroup, as: 'group' },
    ]
  });

  const totalUsers = users.length;

  return { totalPages: Math.ceil(totalUsers / paginationConsts.SIZE), users }
};

const getByRole = async (role, page) => {
  if (!role) throw generateErrorMessage(errorsMessages.userNotFound);

  const users = await User.findAll({
    limit: paginationConsts.SIZE,
    offset: page * paginationConsts.SIZE,
    where: {
      role: { [Op.contains]: [role] }
    },
    attributes: { exclude: ['password'] },
    include: [
      { model: PrayerGroup, as: 'group' }
    ]
  });

  const totalUsers = users.length;

   return { totalPages: Math.ceil(totalUsers / pagination.SIZE), users }
}

const login = async (username, password) => {
  const user = await User.findOne({
    where: { username, password },
    attributes: { exclude: ['password'] },
  });

  if (!user) return generateErrorMessage(errorsMessages.userNotFound);

  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  delete user.dataValues.password;

  const token = jwt.sign({ userData: user.dataValues }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['passowrd'] },
    include: [
      { model: PrayerGroup, as: 'group' },
    ]
  });

  if (!user) return generateErrorMessage(errorsMessages.userNotFound);

  return user;
};

module.exports = {
  login,
  getAll,
  create,
  update,
  destroy,
  getById,
  getByRole,
};