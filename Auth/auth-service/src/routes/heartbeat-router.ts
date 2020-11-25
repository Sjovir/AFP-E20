import Router from 'koa-router';

const router = new Router({ prefix: '/heartbeats' });

router.get('/frontend', async (ctx, next) => {
  const { FRONTEND_ADDRESS, FRONTEND_PORT } = process.env;
  const url = `http://${FRONTEND_ADDRESS}:${FRONTEND_PORT}`;

  try {
    await ctx.axios.get(url);
    ctx.response.status = 200;
    await next();
  } catch (err) {
    ctx.throw(503);
  }
});

export default router;
