/* eslint-disable sonarjs/no-duplicate-string */
const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const upload = require('multer')();

const { eventServices, userService } = require('../services');
const { validateQueryParams, validateFields } = require('../middlewares');
const validateJWT = require('../api/auth/validateJWT');
const validateUserAdmin = require('../api/auth/validateUserAdmin');
const errorsMessages = require('../utils/errorsMessages');
const validateSessionUser = require('../api/auth/validateSessionUser');

const router = express.Router();

router.post('/event', [
  validateJWT,
  validateUserAdmin,
  validateFields(Joi.object({
    title: Joi.string().required().min(2),
    schedule_at: Joi.date().required(),
  })),
  rescue(async (req, res, next) => {
    const title = await eventServices.create(req.body);

    if (title.error) {
      return next({ statusCode: 409, message: title.error.message });
    }

    return res.status(201).json({ data: { title }});
  }),
]);


router.get('/events', [
  validateJWT,
  validateQueryParams(Joi.object({
    page: Joi.required()
  })),
  rescue(async (req, res, _next) => {
    const { page } = req.query;

    const eventsData = await eventServices.getAll(page);
    return res.status(201).json(eventsData);
  }),
]);

router.get('/event/:id', [
  validateJWT,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const event = await eventServices.getById(id);

    if (event.error) {
      return next({ statusCode: 404, message: event.error.message });
    }

    return res.status(200).json(event);
  }),
]);

router.put('/event/:id', [
  validateJWT,
  validateUserAdmin,
  validateFields(Joi.object({
    title: Joi.string().min(3),
    schedule_at: Joi.date(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const eventUpdated = await eventServices.update(req.body, id);

    if (eventUpdated.error) {
      return next({
        statusCode: 404,
        message: eventUpdated.error.message,
      });
    }

    return res.status(204).json({ message: "Evento atualizado com sucesso!" });
  }),
]);

router.delete('/event/:id', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const eventDeleted = await eventServices.destroy(id);

    if (eventDeleted.error) {
      return next({ statusCode: 400, message: eventDeleted.error.message });
    }

    return res.status(200).json({ message: "Evento deletado com sucesso!" });
  }),
]);

router.put('/event/:id/associateUsers', [
  validateJWT,
  validateUserAdmin,
  rescue(async (req, res, next) => {
    const { id: eventId } = req.params;
    const { userIds } = req.body;

    const users = await Promise.all(userIds.map(async (userId) => await userService.getById(userId)));

    const response = await eventServices.associateUsers(users, eventId);

    if (response.error) {
      return next({ statusCode: 400, message: response.error.message });
    }

    return res.status(200).json({ message: "Usuários adicionados no evento com sucesso" });
  })
])


module.exports = router;