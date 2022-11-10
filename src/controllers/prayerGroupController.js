const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const validateUserAdmin = require('../api/auth/validateUserAdmin');
const validateJWT = require('../api/auth/validateJWT');
const middlewares = require('../middlewares');

const { PrayerGroup, City, State, Country, EvangelizationCenter } = require('../models');

const router = express.Router();

router.post('/prayergroup', [
  validateJWT,
  validateUserAdmin,
  middlewares.validateFields(Joi.object({
    name: Joi.string().required(),
    levelGroup: Joi.string().required(),
    cityId: Joi.number().required(),
    stateId: Joi.number().required(),
    countryId: Joi.number().required(),
    centerId: Joi.number().required(),
  })),
  rescue(async (req, res, _next) => {
    const { name, levelGroup, cityId, stateId, countryId, centerId } = req.body;
    const prayergroup = await PrayerGroup
      .create({ name, levelGroup, cityId, stateId, countryId, centerId });
    return res.status(201).json(prayergroup);
  })
]);

router.get('/prayergroup', [
  validateJWT,
  validateUserAdmin,
  rescue(async (_req, res, _next) => {
    const prayergroups = await PrayerGroup.findAll({
      include: [
        { model: City, as: 'city' },
        { model: State, as: 'state' },
        { model: Country, as: 'country' },
        { model: EvangelizationCenter, as: 'EvangelizationCenter' },
      ],
    });

    return res.status(200).json(prayergroups);
  })
]);

router.get('/prayergroup/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, _next) => {
    const { id } = req.params;
    const prayergroups = await PrayerGroup.findByPk(id, {
      include: [
        { model: City, as: 'city' },
        { model: State, as: 'state' },
        { model: Country, as: 'country' },
        { model: EvangelizationCenter, as: 'EvangelizationCenter' },
      ],
    });

    return res.status(200).json(prayergroups);
  })
]);

router.put('/prayergroup/:id', [
  validateJWT,
  validateUserAdmin,
  middlewares.validateFields(Joi.object({
    name: Joi.string().required(),
    levelGroup: Joi.string().required(),
    cityId: Joi.number().required(),
    stateId: Joi.number().required(),
    countryId: Joi.number().required(),
    centerId: Joi.number().required(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const { name, levelGroup, cityId, stateId, countryId, centerId } = req.body;

    const prayerGroupUpdated = await PrayerGroup.update({ name, levelGroup, cityId, stateId, countryId, centerId }, { where: { id }, returning: true});

    return res.status(200).json(prayerGroupUpdated[1]);
  })
]);

router.delete('/prayergroup/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, _next) => {
    const { id } = req.params;
    await PrayerGroup.destroy({ where: { id } });
    return res.status(200).json({ message: "Grupo deletado com sucesso!" });
  })
]);

module.exports = router;