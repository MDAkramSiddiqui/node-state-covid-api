const path = require('path');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

const scriptName = path.basename(__filename);

exports.buildResponse = catchAsync(async (req, res) => {
  logger.debug(scriptName, 'buildResponse()');
  const { responseData } = res.locals;

  return res.status(200).json({
    status: 'success',
    data: responseData,
  });
});
