const ping = require('./ping');
const cityController = require('./cityController');
const countryController = require('./countryController');
const stateController = require('./stateController');
const evangeCenterController = require('./evangeCenterController');
const prayerGroupController = require('./prayerGroupController');
const userController = require('./userController');
const attendenceController = require('./attendenceController');
const eventController = require('./eventController');

module.exports = {
  ping,
  cityController,
  stateController,
  countryController,
  userController,
  eventController,
  prayerGroupController,
  evangeCenterController,
  attendenceController,
};
