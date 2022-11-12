const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');

const AttendenceService = require('../services/attendenceService');

const middlewares = require('../middlewares');

const router = express.Router();

router.post('/attendence', [
  // colocar aqui talvez a validação de admin e user logado
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
  // colocar aqui talvez a validação de admin e user logado
  middlewares.validateQueryParams(Joi.object({
    userId: Joi.string(),
    present: Joi.string(),
    prayerGroupId: Joi.string(),
    date: Joi.string(),
    year: Joi.alternatives().conditional('month', { is: undefined, then: Joi.string().required(), otherwise: Joi.string() }),
    month: Joi.alternatives().conditional('year', { is: undefined, then: Joi.string().required(), otherwise: Joi.string() })
  })),
  rescue(async (req, res, next) => {
    const { query } = req;

    const response = await AttendenceService.searchBy(query);

    if (response.error) {
      const { error: { message } } = response;
      next({ statusCode: 400, message })
    }

    res.status(200).json(response)
  })
]);

module.exports = router;