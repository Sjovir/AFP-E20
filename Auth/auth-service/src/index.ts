import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import gracefulShutdown from 'http-graceful-shutdown';

import client from './database/mariadb-client';
import { producer } from './kafka/installation-producer';
import router from './routes/router';

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(7000);

server.on('listening', () => {
  console.log('[Auth] Server is running on port 7000!');
});

gracefulShutdown(server, {
  onShutdown: async (signal) => {
    console.log(`[Auth] Cleaning up from ${signal}.`);

    await client.end();
    await producer.disconnect();
  },
  finally: async () => {
    console.log('[Auth] Server is shutting down.');
  },
});

export default server;
