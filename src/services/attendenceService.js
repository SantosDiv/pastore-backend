const { Op, fn } = require('sequelize');

const { Attendence } = require('../models');
const errorsMessages = require('../utils/errorsMessages');
const { removeNullValuesFromObject } = require('../utils/removeNullValuesFromObject');

const generateErrorMessage = (objectError) => ({ error: objectError });

const _buildRawQueries = (query) => {
  const rawQueries = [];

  if (query.month || query.year) { // add queries for month and year
    if (!query.year) throw generateErrorMessage(errorsMessages.scheduleQueryInvalid);
    if (!query.month) throw generateErrorMessage(errorsMessages.scheduleQueryInvalid);

    rawQueries.push(fn('EXTRACT(MONTH from "date") = ', query.month));
    rawQueries.push(fn('EXTRACT(YEAR from "date") = ', query.year));
    delete query.month;
    delete query.year
  }


  if (query.userId == 'undefined' || query.userId == 'null') {
    throw generateErrorMessage(errorsMessages.scheduleQueryInvalid);
  }

  if (query.present) Number(query.present);

  const queryWithoutNullValues = removeNullValuesFromObject(query)

  rawQueries.push(queryWithoutNullValues); // add object queries not null

  return rawQueries;
}

const searchBy = async (query) => {
  const response = await Attendence.findAll({
    where: {
      [Op.and]: _buildRawQueries(query),
    }
  });

  return response;
}

const create = async ({ userId, prayerGroupId, date, present }) => {
  const response = await Attendence.create({ userId, prayerGroupId, date, present });
  return response;
}

module.exports = {
  searchBy,
}