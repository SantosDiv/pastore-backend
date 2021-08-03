// academia da coluna vertebral
/* eslint-disable sonarjs/no-duplicate-string */
const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');

const { shepherdService } = require('../services');
const middlewares = require('../middlewares');
const validateJWT = require('../api/auth/validateJWT');
const validateUserAdmin = require('../api/auth/validateUserAdmin');
const errorsMessages = require('../utils/errorsMessages');
const validateSessionUser = require('../api/auth/validateSessionUser');

const router = express.Router();

router.post('/shepherd', [
  middlewares.validateFields(Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
    rule: Joi.string().required(),
    prayerGroupId: Joi.number().required(),
  })),
  rescue(async (req, res, next) => {
    const sheperd = await shepherdService.create(req.body);

    if (sheperd.error) {
      return next({ statusCode: 409, message: sheperd.error.message });
    }

    return res.status(201).json(sheperd);
  }),
]);

router.post('/login', [
  middlewares.validateFields(Joi.object({
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
  })),
  rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await shepherdService.login(email, password);

    if (token.error) {
      return next({ statusCode: 400, message: token.error });
    }

    return res.status(200).json(token);
  }),
]);

router.get('/login/shepherd', [
  validateJWT,
  rescue(async (req, res, _next) => {
    const sheperd = req.user;
    return res.status(200).json(sheperd);
  }),
]);

router.get('/shepherds', [
  validateJWT,
  validateUserAdmin,
  rescue(async (_req, res, _next) => {
    const sheperds = await shepherdService.getAll();
    return res.status(201).json(sheperds);
  }),
]);

router.get('/shepherd/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const shepherd = await shepherdService.getById(id);

    if (shepherd.error) {
      return next({ statusCode: 404, message: shepherd.error.message });
    }

    return res.status(200).json(shepherd);
  }),
]);

router.put('/shepherd/:id', [
  validateJWT,
  validateSessionUser('admin'),
  middlewares.validateFields(Joi.object({
    name: Joi.string().min(2),
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }),
    password: Joi.string().min(6),
    role: Joi.string(),
    rule: Joi.string(),
    prayerGroupId: Joi.number(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const userUpdated = await shepherdService.update(req.body, id);

    if (userUpdated.error) {
      return next({
        statusCode: 404,
        message: userUpdated.error.message,
      });
    }

    return res.status(204).json(userUpdated);
  }),
]);

router.delete('/shepherd/:id', [
  validateJWT,
  validateSessionUser('admin'),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const userDeleted = await shepherdService.destroy(id);

    if (userDeleted.error) {
      return next({ statusCode: 400, message: userDeleted.error.message });
    }

    return res.status(200).json(userDeleted);
  }),
]);

module.exports = router;