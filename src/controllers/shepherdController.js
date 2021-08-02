const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');

const { shepherdService } = require('../services');
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
  rescue(async (req, res, next) => {
    const sheperd = await shepherdService.create(req.body);

    if (sheperd.error) {
      sheperd.error.statusCode = 409;
      return next(sheperd.error);
    }

    return res.status(201).json(sheperd);
  }),
]);

router.post('/login', [
  middlewares.validateFields(Joi.object({
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: '"email" must be a valid email' }).required(),
    password: Joi.string().min(6).required(),
  })),
  rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await shepherdService.login(email, password);

    if (token.error) {
      token.error.statusCode = 400;
      return next(token.error);
    }

    return res.status(200).json(token);
  }),
]);

router.get('/shepherd', rescue(async (_req, res, _next) => {
  const sheperds = await shepherdService.getAll();
  return res.status(201).json(sheperds);
}));

module.exports = router;