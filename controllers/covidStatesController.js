// const path = require('path');

const catchAsync = require('../utils/catchAsync');
const CovidStatesService = require('../services/covidStatesService');

// const scriptName = path.basename(__filename);

// eslint-disable-next-line
exports.getCovidStatesData = catchAsync(async (req, res, next) => {
  const covidStatesData = await CovidStatesService.getCovidStatesData();

  res.status(201).json({
    status: 'success',
    data: covidStatesData,
  });
});
