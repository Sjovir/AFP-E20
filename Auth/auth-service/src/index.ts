import Koa from "koa";
import bodyparser from "koa-bodyparser";
import dotenv from "dotenv";

import router from "./routes/router";

dotenv.config()

const server = new Koa();

server.use(bodyparser())
server.use(router.routes())

const app = server.listen(3000);

export default app;