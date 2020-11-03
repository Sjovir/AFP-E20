import winston, { transports, format } from 'winston';
import 'winston-daily-rotate-file';

const dailyTransport = new winston.transports.DailyRotateFile({});

const logger = winston.createLogger({
  defaultMeta: { service: 'auth-service' },
  transports: [new winston.transports.File({ filename: 'combined.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
