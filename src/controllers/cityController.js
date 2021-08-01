const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { City } = require('../models');

const router = express.Router();

router.post('/city', rescue(async (req, res, _next) => {
  const { name } = req.body;
  const city = await City.create({ name });
  return res.status(201).json(city);
}));

module.exports = router;