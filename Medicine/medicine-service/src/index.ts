import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import './kafka-consumer/citizen-consumer';
import router from './routes/router';

const server = new Koa();

server.use(cors({ origin: '*' }));
server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());

const app = server.listen(7200);

app.on('listening', () => {
  console.log('[Medicine] Server is running on port 7200!');
});

app.on('close', () => {
  console.log('[Medicine] Server is closing!');
});

process.on('SIGINT', function () {
  app.close();
});

export default app;
