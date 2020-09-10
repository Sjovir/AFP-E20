import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import bodyparser from 'koa-bodyparser';

import router from './routes/router';

const server = new Koa();

server.use(bodyparser());
server.use(router.routes());

const app = server.listen(3000);

export default app;
