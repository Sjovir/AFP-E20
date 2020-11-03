import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import gracefulShutdown from 'http-graceful-shutdown';

import client from './database/mariadb-client';
import { producer } from './kafka/citizen-producer';
import './kafka/installation-consumer';
import router from './routes/router';

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(7100, () => {
  console.log('[Bosted] Server is running on port 7100!');
});

gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  onShutdown: async (signal) => {
    console.log(`[Bosted] Cleaning up from ${signal}.`);

    // consumer cannot be disconnected or stopped since
    // it runs on a child process (I think?)

    await producer.disconnect();
    await client.end();
  },
  finally: async () => {
    console.log('[Bosted] Server is shutting down.');
  },
});

export default server;
