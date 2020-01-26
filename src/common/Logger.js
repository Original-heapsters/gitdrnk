const { createLogger, format, transports } = require('winston');

const { combine, timestamp, prettyPrint } = format;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';


const logger = createLogger({
  level: LOG_LEVEL,
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({
      format: combine(
        timestamp(),
        prettyPrint(),
      ),
    }),
  ],
});

exports.logger = logger;
