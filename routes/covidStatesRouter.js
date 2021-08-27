const router = require('express').Router();

const covidStatesController = require('../controllers/covidStatesController');

router.get('/', covidStatesController.getCovidStatesData);

module.exports = router;
