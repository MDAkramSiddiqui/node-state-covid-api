const LogLevelEnum = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

class Logger {
  constructor() {
    this.level = LogLevelEnum.ERROR;
  }

  static setLogLevel(logLevel) {
    this.level = logLevel;
  }

  static log(level, ...logArgs) {
    if (this.level > level) {
      return;
    }

    switch (level) {
      case LogLevelEnum.DEBUG:
        console.debug('[DEBUG]: ', ...logArgs);
        break;
      case LogLevelEnum.INFO:
        console.info('[INFO]: ', ...logArgs);
        break;
      case LogLevelEnum.WARN:
        console.warn('[WARN]: ', ...logArgs);
        break;
      case LogLevelEnum.ERROR:
        console.error('[ERROR]: ', ...logArgs);
        break;
      default:
        console.log(...logArgs);
        break;
    }
  }
}

module.exports = {
  LogLevelEnum,
  debug(...logArgs) {
    Logger.log(LogLevelEnum.DEBUG, ...logArgs);
  },

  info(...logArgs) {
    Logger.log(LogLevelEnum.INFO, ...logArgs);
  },

  warn(...logArgs) {
    Logger.log(LogLevelEnum.WARN, ...logArgs);
  },

  error(...logArgs) {
    Logger.log(LogLevelEnum.ERROR, ...logArgs);
  },
};
