import Koa from "koa";
import bodyparser from "koa-bodyparser";
import dd from "koa-json"

import router from "./routes/router";

const server = new Koa();

server.use(bodyparser())
server.use(router.routes())

server.listen(3000);