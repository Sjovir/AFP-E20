import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import router from './routes/router';

const server = new Koa();

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(bodyparser());
server.use(router.routes());

const app = server.listen(3010);

export default app;
