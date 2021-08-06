require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const app = express();
// const { PORT } = process.env;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => res.status(200).json('pong'));

app.use('/', controllers.cityController);
app.use('/', controllers.stateController);
app.use('/', controllers.countryController);
app.use('/', controllers.shepherdController);
app.use('/', controllers.prayerGroupController);
app.use('/', controllers.evangeCenterController);

app.use(middlewares.error);

module.exports = app;