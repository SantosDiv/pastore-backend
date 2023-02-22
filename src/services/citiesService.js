const { City } = require('../models');
const generateErrorMessage = require('../utils/generateErrorMessage');
const errorsMessages = require('../utils/errorsMessages');


const create = async ({ name }) => {
  try {
    const cityAlreadyExists = await City.findOne({ where: { name } });
    if (cityAlreadyExists) {
      throw { message: 'Cidade já cadastrada.' };
    }

    const city = await City.create({ name });
    return city;
  } catch (error) {
    errorsMessages.cityNotCreated.details = error.message;
    throw generateErrorMessage(errorsMessages.cityNotCreated);
  }
};

const destroy = async (id) => {
  try {
    const city = await City.findByPk(id);
    console.log(city)
    if(!city) {
      throw { message: `A cidade de id: ${id} não existe na base de dados` }
    }

    await City.destroy({ where: { id } });
    return city;
  } catch (error) {
    errorsMessages.cityNotFound.details = error.message;
    throw generateErrorMessage(errorsMessages.cityNotFound);
  }
};

module.exports = {
  create,
  destroy,
};
