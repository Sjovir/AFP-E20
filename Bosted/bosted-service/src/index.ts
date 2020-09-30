import 'reflect-metadata';
import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

dotenv.config();
import router from './routes/router';

const server = new Koa();

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());

const app = server.listen(3010);

export default app;
