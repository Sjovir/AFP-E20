import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa, { Context } from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import gracefulShutdown from 'http-graceful-shutdown';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import logger from './logger';
import client from './database/mariadb-client';
import { producer } from './kafka/installation-producer';
import router from './routes/router';

const CORRELATION_HEADER = 'x-correlation-id';
const PORT = process.env.PORT || 7000;

const app = new Koa();

app.on('error', (err: Error, ctx: Context) => {
  const errObj = {
    correlationId: ctx.header[CORRELATION_HEADER],
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  };

  if (ctx.status >= 500) {
    logger.error(
      `error on request: ${ctx.request.method} ${ctx.request.url}`,
      errObj
    );
  } else {
    logger.warn(
      `warning on request: ${ctx.request.method} ${ctx.request.url}`,
      errObj
    );
  }
});

app.use(cors({ origin: '*' }));
app.use(bodyparser());

app.use(async (ctx, next) => {
  if (!ctx.header[CORRELATION_HEADER]) ctx.header[CORRELATION_HEADER] = uuid();

  const axiosHeaders = {};
  axiosHeaders[CORRELATION_HEADER] = ctx.request.header[CORRELATION_HEADER];
  if (ctx.request.header['authorization'])
    axiosHeaders['authorization'] = ctx.request.header['authorization'];

  ctx.axios = axios.create({
    headers: axiosHeaders,
  });

  await next();
});

app.use(async (ctx, next) => {
  const { request, response } = ctx;

  const requestMetadata = {
    method: request.method,
    url: request.url,
    header: request.header,
    ...(ctx.params && Object.keys(ctx.params).length > 0
      ? { params: ctx.params }
      : {}),
    ...(request.body && Object.keys(request.body).length > 0
      ? { body: request.body }
      : {}),
  };

  logger.info(`request: ${request.method} ${ctx.request.url}`, requestMetadata);

  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body =
      ctx.status === 500
        ? 'Something happen within the server. Please try again later.'
        : err.message;
    ctx.app.emit('error', err, ctx);
  }

  const responseMetadata = {
    correlationId: ctx.request.header[CORRELATION_HEADER],
    header: response.headers,
    status: response.status,
    body: response.body,
    length: response.length,
    type: response.type,
  };

  logger.info(
    `response: ${request.method} ${ctx.request.url}`,
    responseMetadata
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}!`);
});

gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
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
