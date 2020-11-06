import winston, { transports, format } from 'winston';
import 'winston-daily-rotate-file';

/*
  1. Create folder: sudo mkdir /var/log/afpe20
  2. Change permission: sudo chmod a+w /var/log/afpe20
*/

const dailyTransport = new winston.transports.DailyRotateFile({
  filename: 'auth-service_%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  dirname: '/var/log/afpe20',
});

const customFormat = format.combine(
  format.metadata(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((info) => {
    const structure = {
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
      metadata: info.metadata,
    };

    if (Object.keys(structure.metadata).length === 0) delete structure.metadata;

    return JSON.stringify(structure);
  })
);

const logger = winston.createLogger({
  // defaultMeta: { service: 'auth-service' },
  format: customFormat,
  exitOnError: false,
  transports: [dailyTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          return `[${info.level}] [${info.timestamp}]: ${info.message}`;
        })
      ),
    })
  );
}

export default logger;
