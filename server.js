const path = require('path');
const logger = require('./utils/logger');

const scriptName = path.basename(__dirname);

const app = require('./app');

const PORT = process.env.PORT || 8000;
app.on('initServer', () => {
  const server = app.listen(PORT, () => {
    logger.info(scriptName, `Connected to Port: ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(scriptName, err);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    server.close(() => logger.warn(scriptName, 'Server Closed, gracefully'));
  });
});

app.emit('initServer');
