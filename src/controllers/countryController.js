const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { Country } = require('../models');

const router = express.Router();

router.post('/country', rescue(async (req, res, _next) => {
  const { name } = req.body;
  const country = await Country.create({ name });
  return res.status(201).json(country);
}));

module.exports = router;