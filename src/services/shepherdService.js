require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Shepherd } = require('../models');
const errorsMessages = require('../utils/errorsMessages');

const generateErrorMessage = (objectError) => ({ error: objectError });

const create = async ({ name, email, password, role, rule = 'user', prayerGroupId }) => {
  const userAlreadyExist = await Shepherd.findOne({ where: { email } });

  if (userAlreadyExist) {
    return generateErrorMessage(errorsMessages.userAlreadyExist);
  }

  const sheperd = await Shepherd
    .create({ name, email, password, role, rule, prayerGroupId });

  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const { id } = sheperd.dataValues;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);

  return { token };
};

const update = async (data, id) => {
  const user = await Shepherd.findByPk(id);

  if (!user) return generateErrorMessage(errorsMessages.userNotFound);

  const response = await Shepherd.update({ ...data }, { where: { id } });

  return response;
};

const destroy = async (id) => {
  await Shepherd.destroy({ where: { id } });
  return { message: 'User deleted successfully' };
};

const getAll = async () => Shepherd.findAll();

const login = async (email, password) => {
  const sheperd = await Shepherd.findOne({
    where: { email, password },
    attributes: { exclude: ['password'] },
  });

  if (!sheperd) return generateErrorMessage(errorsMessages.userNotFound);

  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const { id } = sheperd.dataValues;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

const getById = async (id) => {
  const shepherd = await Shepherd.findByPk(id);

  if (!shepherd) return generateErrorMessage(errorsMessages.userNotFound);

  return shepherd;
};

module.exports = {
  login,
  getAll,
  create,
  update,
  destroy,
  getById,
};