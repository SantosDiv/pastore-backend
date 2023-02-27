const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');

const AttendenceService = require('../services/attendenceService');

const middlewares = require('../middlewares');
const validateJWT = require('../api/auth/validateJWT');

const router = express.Router();

router.post('/attendence', [
  validateJWT,
  middlewares.validateFields(Joi.object({
    userId: Joi.string().required(),
    present: Joi.string().required(),
    prayerGroupId: Joi.string().required(),
    date: Joi.string().required(),
  })),
  rescue(async (req, res, next) => {
    try {
      const response = await AttendenceService.create(req.body);
      res.status(200).json(response);
    } catch ({ message }) {
      next({ statusCode: 400, message  })
    }
  })
]);

router.get('/attendence', [
  validateJWT,
  middlewares.validateQueryParams(Joi.object({
    userId: Joi.string().required(),
    present: Joi.string(),
    prayerGroupId: Joi.string(),
    date: Joi.string(),
    year: Joi.alternatives().conditional('month', { is: undefined, then: Joi.string().required(), otherwise: Joi.string() }),
    month: Joi.alternatives().conditional('year', { is: undefined, then: Joi.string().required(), otherwise: Joi.string() })
  })),
  rescue(async (req, res, next) => {
    const { query } = req;
    try {
      const response = await AttendenceService.searchBy(query);

      res.status(200).json(response)
    } catch (error) {
      const { error: { message } } = error;
      next({ statusCode: 400, message })
    }

  })
]);

module.exports = router;