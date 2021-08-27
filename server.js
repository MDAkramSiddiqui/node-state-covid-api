// const dotenv = require('dotenv');
const logger = require('./utils/logger');

// dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 8000;
// const server = http.createServer(app);
app.on('initServer', () => {
  const server = app.listen(PORT, () => {
    logger.info(`Connected to Port: ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(err);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    server.close(() => logger.warn('Server Closed, gracefully'));
  });
});

app.emit('initServer');
