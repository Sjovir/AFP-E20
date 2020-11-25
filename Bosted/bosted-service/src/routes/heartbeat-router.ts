import Router from 'koa-router';

const router = new Router({ prefix: '/heartbeats' });

const FRONTEND_HEARTBEAT = '/heartbeats/frontend';

router.get('/auth/frontend', async (ctx, next) => {
  const { AUTH_SERVICE, AUTH_PORT } = process.env;
  const url = `http://${AUTH_SERVICE}:${AUTH_PORT}${FRONTEND_HEARTBEAT}`;

  try {
    await ctx.axios.get(url);
    ctx.response.status = 200;
    await next();
  } catch (err) {
    ctx.throw(503);
  }
});

router.get('/medicine/frontend', async (ctx, next) => {
  const { MEDICINE_SERVICE, MEDICINE_PORT } = process.env;
  const url = `http://${MEDICINE_SERVICE}:${MEDICINE_PORT}${FRONTEND_HEARTBEAT}`;

  try {
    await ctx.axios.get(url);
    ctx.response.status = 200;
    await next();
  } catch (err) {
    ctx.throw(503);
  }
});

export default router;
