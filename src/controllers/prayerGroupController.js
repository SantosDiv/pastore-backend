const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { PrayerGroup, City, State, Country, EvangelizationCenter } = require('../models');

const router = express.Router();

router.post('/prayergroup', rescue(async (req, res, _next) => {
  const { name, levelGroup, cityId, stateId, countryId, centerId } = req.body;
  const prayergroup = await PrayerGroup
    .create({ name, levelGroup, cityId, stateId, countryId, centerId });
  return res.status(201).json(prayergroup);
}));

router.get('/prayergroup', rescue(async (_req, res, _next) => {
  const prayergroups = await PrayerGroup.findAll({
    include: [
      { model: City, as: 'city' },
      { model: State, as: 'state' },
      { model: Country, as: 'country' },
      { model: EvangelizationCenter, as: 'EvangelizationCenter' },
    ],
  });

  return res.status(200).json(prayergroups);
}));

module.exports = router;