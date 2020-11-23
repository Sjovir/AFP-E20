import Router from 'koa-router';

const router = new Router({ prefix: '/heartbeats' });

router.get('/frontend', async (ctx, next) => {
  try {
    await ctx.axios.get('http://localhost:8100');
    ctx.response.status = 200;
    await next();
  } catch (err) {
    ctx.throw(503);
  }
});

export default router;
