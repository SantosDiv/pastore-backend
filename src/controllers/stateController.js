const express = require('express');
// const Joi = require('joi');
const rescue = require('express-rescue');

const { State } = require('../models');

const router = express.Router();

router.post('/state', rescue(async (req, res, _next) => {
  const { name } = req.body;
  const state = await State.create({ name });
  return res.status(201).json(state);
}));

module.exports = router;