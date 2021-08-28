const router = require('express').Router();

const covidStatesController = require('../controllers/covidStatesController');
const cacheManagerMiddleware = require('../middlewares/cacheManagerMiddleware');
const responseBuilder = require('../middlewares/responseBuilder');

router.get('/', [
  cacheManagerMiddleware.getFromCache('COVID_STATES_DATA'),
  covidStatesController.getCovidStatesData,
  cacheManagerMiddleware.saveToCache('COVID_STATES_DATA'),
  responseBuilder.buildResponse,
]);

module.exports = router;
