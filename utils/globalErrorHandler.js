// const path = require('path');

// const logger = require('./logger');

// const scriptName = path.basename(__filename);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => res.status(err.statusCode).render('error', {
  title: 'Something went wrong!',
  msg: 'Please try again later.',
});

module.exports = (err, req, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  // eslint-disable-next-line
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, req, res);
  } if (process.env.NODE_ENV === 'production') {
    const error = { ...err };
    error.message = err.message;
    return sendErrorProd(error, req, res);
  }
};
