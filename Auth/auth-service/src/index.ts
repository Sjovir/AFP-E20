import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import gracefulShutdown from 'http-graceful-shutdown';

import logger from './logger';
import client from './database/mariadb-client';
import { producer } from './kafka/installation-producer';
import router from './routes/router';

const PORT = process.env.PORT || 7000;

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}!`);
});

gracefulShutdown(server, {
  onShutdown: async (signal) => {
    logger.info(`Cleaning up from ${signal}.`);

    await client.end();
    await producer.disconnect();
  },
  finally: () => {
    logger.info('Server is shutting down.');
  },
});

export default server;
