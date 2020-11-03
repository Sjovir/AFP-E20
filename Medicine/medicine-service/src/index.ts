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

const PORT = process.env.PORT || 7200;

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT, () => {
  console.log(`[Medicine] Server is running on port ${PORT}!`);
});

gracefulShutdown(server, {
  onShutdown: async (signal) => {
    console.log(`[Medicine] Cleaning up from ${signal}.`);

    // consumer cannot be disconnected or stopped since
    // it runs on a child process (I think?)

    await client.end();
  },
  finally: () => {
    console.log('[Medicine] Server is shutting down.');
  },
});

export default server;
