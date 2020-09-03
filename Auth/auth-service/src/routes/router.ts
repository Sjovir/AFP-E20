import Router from 'koa-router';

const router = new Router();

async function authenticate(ctx, next) {
    if (ctx.headers.auth) {
        await next();
    } else {
        ctx.response.status = 401;
    }
}

router.post('/users', authenticate, (ctx, next) => {
    ctx.body = {
        test: 'Works?'
    }
})

router.post('/user/:id', (ctx, next) => {
    ctx.body = {
        id: ctx.params.id,
        firstName: 'Hello',
        lastName: 'World',
    }
})

router.post('/login', (ctx, next) => {
    ctx.body = {
        test: 'Works?'
    }
})

export default router;