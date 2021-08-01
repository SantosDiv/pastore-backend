const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { EvangelizationCenter } = require('../models');

const router = express.Router();

router.post('/center', rescue(async (req, res, _next) => {
  const { name } = req.body;
  const center = await EvangelizationCenter.create({ name });
  return res.status(201).json(center);
}));

module.exports = router;