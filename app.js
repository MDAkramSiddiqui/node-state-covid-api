const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const covidStatesRouter = require('./routes/covidStatesRouter');
const logger = require('./utils/logger');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.options('*', cors());

app.use(express.json({ limit: '10Kb' }));
app.use(express.urlencoded({ extended: true, limit: '10Kb' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/covid/states', covidStatesRouter);

// For handling all the unknown routes
app.use('*', (req, res) => {
  // Later render a page here so that it displays 404 page not found
  logger.warn('Unknown route, please check it');
  res.status(404).json({ status: 'Internal System failure' });
  // next();
});

module.exports = app;
