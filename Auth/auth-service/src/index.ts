import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import router from './routes/router';

const server = new Koa();

server.use(cors({ origin: '*' }));
server.use(bodyparser());
server.use(router.routes());

const app = server.listen(6000);

export default app;
