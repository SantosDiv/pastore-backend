require('dotenv').config();
const { User, Event } = require('../models');

const errorsMessages = require('../utils/errorsMessages');
const { Op } = require('sequelize');
const { paginationConsts } = require('../utils/consts');
const removeNullValuesFromObject = require('../utils/removeNullValuesFromObject');

const generateErrorMessage = (objectError) => ({ error: objectError });

const create = async ({ title, schedule_at }) => {
  const event = await Event.findOne({ where: { title } });

  if (event) {
    return generateErrorMessage(errorsMessages.eventAlreadyExists);
  }

  await Event.create({ title, schedule_at });

  return title;
}

const getAll = async (page) => {
  const totalEvents = await Event.count();

  const events = await Event.findAll({
    limit: paginationConsts.SIZE,
    offset: page * paginationConsts.SIZE,
  });


  return { totalPages: Math.ceil(totalEvents / paginationConsts.SIZE), events, totalItems: totalEvents };
}

const getById = async (id) => {
  return await Event.findByPk(id, { includes: User });
}

const update = async (data, id) => {
  const event = await Event.findByPk(id);

  if(!event) {
    return generateErrorMessage(errorsMessages.eventNotFound)
  }
  const dataWithoutNullValues = removeNullValuesFromObject(data);

  const response = await Event.update({...dataWithoutNullValues}, { where: { id } });

  return response;

}

const destroy = async (id) => {
  const event = await Event.findOne({ where: { id } });

  if(!event) {
    return generateErrorMessage(errorsMessages.eventNotFound)
  }
  await Event.destroy({ where: { id } });

  return {};
}

const associateUsers = async (users, eventId) => {
  const event = await Event.findByPk(eventId);

  if(!event) {
    return generateErrorMessage(errorsMessages.eventNotFound)
  }

  console.log(users);
  users.forEach(async (user) => {
    await event.addUser(user);
  });

  return {};
}

module.exports = {
  create,
  getAll,
  getById,
  destroy,
  update,
  associateUsers
}