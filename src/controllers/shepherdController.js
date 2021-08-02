const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { Shepherd, PrayerGroup } = require('../models');

const router = express.Router();

router.post('/shepherd', rescue(async (req, res, _next) => {
  const { name, email, password, role, rule, prayerGroupId } = req.body;
  const sheperd = await Shepherd
    .create({ name, email, password, role, rule, prayerGroupId });
  return res.status(201).json(sheperd);
}));

router.get('/shepherd', rescue(async (_req, res, _next) => {
  const sheperds = await Shepherd.findAll({
    include: [
      { model: PrayerGroup, as: 'prayerGroup', where: { cityId: 3 } },
    ],
  });
  return res.status(201).json(sheperds);
}));

module.exports = router;