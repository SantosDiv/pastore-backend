// academia da coluna vertebral
/* eslint-disable sonarjs/no-duplicate-string */
const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const upload = require('multer')();

const { userService } = require('../services');
const middlewares = require('../middlewares');
const validateJWT = require('../api/auth/validateJWT');
const validateUserAdmin = require('../api/auth/validateUserAdmin');
const errorsMessages = require('../utils/errorsMessages');
const validateSessionUser = require('../api/auth/validateSessionUser');

const router = express.Router();

router.post('/user', [
  upload.array(),
  middlewares.validateFields(Joi.object({
    name: Joi.string().required().min(2),
    username: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean().default(false),
    role: Joi.alternatives().conditional('admin', { is: false, then: Joi.array().min(1), otherwise: Joi.array().length(0) }),
    active: Joi.boolean(),
    prayerGroupId: Joi.alternatives().conditional('admin', {is: false, then: Joi.number().required(), otherwise: Joi.any()}),
  })),
  rescue(async (req, res, next) => {
    const token = await userService.create(req.body);

    if (token.error) {
      return next({ statusCode: 409, message: token.error.message });
    }

    return res.status(201).json(token);
  }),
]);

router.post('/login', [
  upload.array(),
  middlewares.validateFields(Joi.object({
    username: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
  })),
  rescue(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await userService.login(username, password);

    if (token.error) {
      return next({ statusCode: 400, message: token.error });
    }

    return res.status(200).json(token);
  }),
]);

router.get('/login/user', [
  validateJWT,
  rescue(async (req, res, _next) => {
    const user = req.user;
    return res.status(200).json(user);
  }),
]);

router.get('/users', [
  validateJWT,
  validateUserAdmin,
  rescue(async (_req, res, _next) => {
    const users = await userService.getAll();
    return res.status(201).json(users);
  }),
]);

router.get('/user/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (user.error) {
      return next({ statusCode: 404, message: user.error.message });
    }

    return res.status(200).json(user);
  }),
]);

router.put('/user/:id', [
  upload.array(),
  validateJWT,
  validateSessionUser,
  middlewares.validateFields(Joi.object({
    name: Joi.string().min(2).required(),
    username: Joi.string().required()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }),
    password: Joi.string().required().min(6),
    role: Joi.array(),
    admin: Joi.boolean(),
    active: Joi.boolean(),
    prayerGroupId: Joi.number().required(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    // remover os dados nulos do req.body
    const userUpdated = await userService.update(req.body, id);

    if (userUpdated.error) {
      return next({
        statusCode: 404,
        message: userUpdated.error.message,
      });
    }

    return res.status(204).json(userUpdated);
  }),
]);

router.delete('/user/:id', [
  validateJWT,
  validateSessionUser,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const userDeleted = await userService.destroy(id);

    if (userDeleted.error) {
      return next({ statusCode: 400, message: userDeleted.error.message });
    }

    return res.status(200).json(userDeleted);
  }),
]);

module.exports = router;