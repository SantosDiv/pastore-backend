/* eslint-disable sonarjs/no-duplicate-string */
const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const upload = require('multer')();

const { userService } = require('../services');
const { validateQueryParams, validateFields, validateUserRequest } = require('../middlewares');
const validateJWT = require('../api/auth/validateJWT');
const validateUserAdmin = require('../api/auth/validateUserAdmin');
const errorsMessages = require('../utils/errorsMessages');
const validateSessionUser = require('../api/auth/validateSessionUser');

const router = express.Router();

router.post('/user', [
  upload.array(),
  validateFields(Joi.object({
    name: Joi.string().required().min(2),
    username: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean().default(false),
    role: Joi.alternatives().conditional('admin', { is: false, then: Joi.array().min(1), otherwise: Joi.array().length(0) }),
    active: Joi.boolean().default(true),
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
  validateFields(Joi.object({
    username: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
  })),
  rescue(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await userService.login(username, password);

    if (token.error) {
      const { error: { message } } = token;
      return next({ statusCode: 400, message });
    }

    return res.status(200).json(token);
  }),
]);

router.get('/user/search', [
  validateJWT,
  validateQueryParams(Joi.object({
    page: Joi.required(),
    role: Joi.required()
  })),
  validateUserRequest,
  async (req, res, next) => {
    try {
      const { role, page } = req.query;

      const usersData = await userService.getByRole(role, page);
      res.status(200).json(usersData);
    } catch (error) {
      next(error);
    }
  }
])

router.get('/users', [
  validateJWT,
  validateUserAdmin,
  validateQueryParams(Joi.object({
    page: Joi.required()
  })),
  validateUserRequest,
  rescue(async (req, res, _next) => {
    const { page} = req.query;

    const usersData = await userService.getAll(page);
    return res.status(201).json(usersData);
  }),
]);

router.get('/user/:id', [
  validateJWT,
  validateSessionUser,
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
  validateFields(Joi.object({
    name: Joi.string().required().min(2),
    username: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: errorsMessages.emailInvalid }).required(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean().default(false),
    role: Joi.alternatives().conditional('admin', { is: false, then: Joi.array().min(1), otherwise: Joi.array() }),
    active: Joi.boolean(),
    prayerGroupId: Joi.alternatives().conditional('admin', {is: false, then: Joi.number(), otherwise: Joi.any()}),
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