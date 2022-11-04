const ping = require('./ping');
const cityController = require('./cityController');
const countryController = require('./countryController');
const stateController = require('./stateController');
const evangeCenterController = require('./evangeCenterController');
const prayerGroupController = require('./prayerGroupController');
const userController = require('./userController');

module.exports = {
  ping,
  cityController,
  stateController,
  countryController,
  userController,
  prayerGroupController,
  evangeCenterController,
};
