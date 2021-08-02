const ping = require('./ping');
const cityController = require('./cityController');
const countryController = require('./countryController');
const stateController = require('./stateController');
const evangeCenterController = require('./evangeCenterController');
const prayerGroupController = require('./prayerGroupController');
const shepherdController = require('./shepherdController');

module.exports = {
  ping,
  cityController,
  stateController,
  countryController,
  shepherdController,
  prayerGroupController,
  evangeCenterController,
};
