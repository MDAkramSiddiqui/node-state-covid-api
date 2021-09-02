const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./utils/logger');
const globalErrorHandler = require('./utils/globalErrorHandler');
const covidStatesRouter = require('./routes/covidStatesRouter');
const catchAsync = require('./utils/catchAsync');

const scriptName = path.basename(__filename);

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors({ origin: ['https://react-state-covid.vercel.app'], optionsSuccessStatus: 200 }));
app.options('*', cors());

app.use(express.json({ limit: '10Kb' }));
app.use(express.urlencoded({ extended: true, limit: '10Kb' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/ping', catchAsync((req, res) => {
  res.status(200).send('pong');
}));

app.use('/api/v1/covid/states', covidStatesRouter);

// For handling all the unknown routes
app.use('*', (req, res) => {
  // Later render a page here so that it displays 404 page not found
  logger.warn(scriptName, 'Unknown route, please check it');
  res.status(404).json({ status: 'Internal System failure' });
  // next();
});

app.use(globalErrorHandler);

module.exports = app;
