import Router from 'koa-router';
import { ParameterizedContext, Next } from 'koa';

import { verify, signAccessToken, signRefreshToken } from '../utils/token';
import { JsonWebTokenError } from 'jsonwebtoken';

const router = new Router();

// TODO: allow typescript to see ctx.token 
async function isAuthenticated(ctx: ParameterizedContext, next: Next) {
    ctx.response.status = 401;

    const { authorization } = ctx.headers;

    if (!authorization) return;

    const split = authorization.split(" ");
    if (split.length === 2 && split[0] === "Bearer") {
        const token = split[1];

        if (verify(token)) {
            ctx.response.status = 200;
            ctx.token = token;

            await next();
        }
    }
}

interface AuthBody {
    username: string;
    password: string;
}

router.post('/register', async (ctx, next) => {
    const { username, password }: AuthBody = ctx.request.body;

    if (username.startsWith("t")) {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
})

router.post('/login', async (ctx, next) => {
    const { username, password }: AuthBody = ctx.request.body;

    ctx.response.status = 400;

    if (username === "dennis" || username === "erik") {
        if (password === "sdu" || password === "AFPE20") {
            ctx.response.status = 200

            ctx.body = {
                accessToken: await signAccessToken({ firstName: "Hello", lastName: "World" }),
                refreshToken: await signRefreshToken({}),
            }
        }
    }
})

router.post('/refresh', isAuthenticated, async (ctx, next) => {
    const { refreshToken } = ctx.request.body;

    try {
        verify(refreshToken);

        ctx.body = {
            accessToken: await signAccessToken({ firstName: "Hello", lastName: "World" })
        }
    } catch (err) {
        throw err;
    }
})

export default router;
