import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import gracefulShutdown from 'http-graceful-shutdown';

import client from './database/mariadb-client';
import './kafka/citizen-consumer';
import router from './routes/router';

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(7200);

server.on('listening', () => {
  console.log('[Medicine] Server is running on port 7200!');
});

gracefulShutdown(server, {
  onShutdown: async (signal) => {
    console.log(`[Medicine] Cleaning up from ${signal}.`);

    await client.end();
    // await consumer.disconnect();
  },
  finally: async () => {
    console.log('[Medicine] Server is shutting down.');
  },
});

export default server;
