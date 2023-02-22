const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const { validateJWT, validateUserAdmin } = require('../api/auth');

const { City } = require('../models');
const { validateFields } = require('../middlewares');
const { citiesService } = require('../services');

const router = express.Router();

router.post('/city', [
  validateJWT,
  validateUserAdmin,
  validateFields(Joi.object({
    name: Joi.string().required().min(2).messages({
      "string.empty": "O campo 'nome' não pode ser vazio",
      "string.min": "O campo 'nome' precisa ter no mínimo 2 caracteres",
    })
  })),
  rescue(async (req, res, next) => {
    try {
      const { name } = req.body;
      const city = await citiesService.create({ name });
      return res.status(201).json(city);
    } catch ({ error: { message, details }}) {
      next({ statusCode: 400, message, details })
    }
  }),
]);

router.get('/cities', [
  validateJWT,
  rescue(async (req, res, next) => {
    try {
      const cities = await City.findAll();
      return res.status(200).json(cities);
    } catch ({ message }) {
      next({ statusCode: 400, message })
    }
  }),
]);

router.delete('/city/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = await citiesService.destroy(id);
      res.status(200).json({ message: `Cidade: ${name}, deletada com sucesso` });
    } catch ({ error: { message, details } }) {
      next({ statusCode: 400, message, details })
    }
  }),
])

module.exports = router;