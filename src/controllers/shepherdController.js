const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');

const { Shepherd, PrayerGroup } = require('../models');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/shepherd', [
  middlewares.validateFields(Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: '"email" must be a valid email' }).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
    rule: Joi.string().required(),
    prayerGroupId: Joi.number().required(),
  })),
  rescue(async (req, res, _next) => {
    const { name, email, password, role, rule, prayerGroupId } = req.body;
    const sheperd = await Shepherd
      .create({ name, email, password, role, rule, prayerGroupId });
    return res.status(201).json(sheperd);
  }),
]);

router.get('/shepherd', rescue(async (_req, res, _next) => {
  const sheperds = await Shepherd.findAll({
    include: [
      { model: PrayerGroup, as: 'prayerGroup' },
    ],
  });
  return res.status(201).json(sheperds);
}));

module.exports = router;