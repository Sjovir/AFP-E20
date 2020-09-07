import Router from 'koa-router';
import { ParameterizedContext, Next } from 'koa';

import dbPool from '../database/connector';
import { verify, signAccessToken, signRefreshToken } from '../utils/token';

const router = new Router();

// TODO: allow typescript to see ctx.token
async function isAuthenticated(ctx: ParameterizedContext, next: Next) {
    ctx.response.status = 401;

    const { authorization } = ctx.headers;

    if (!authorization) return;

    const split = authorization.split(' ');
    if (split.length === 2 && split[0] === 'Bearer') {
        const token = split[1];

        if (verify(token)) {
            ctx.response.status = 200;
            ctx.token = token;

            await next();
        }
    }
}

interface RegisterBody {
    firstName: string;
    lastName: string;
    cpr: string;
    username: string;
    password: string;
}

interface LoginBody {
    firstName: string;
    lastName: string;
    cpr: string;
    username: string;
    password: string;
}

router.post('/register', async (ctx, _next) => {
    const {
        firstName,
        lastName,
        cpr,
        username,
        password,
    }: RegisterBody = ctx.request.body;

    const t = await dbPool.query(
        "INSERT INTO User VALUES (uuid(), ?, ?, ?, ?, ?);",
        [firstName, lastName, cpr, username, password]
    );

    console.log(t);

    if (username.startsWith('t')) {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
});

router.post('/login', async (ctx, _next) => {
    const { username, password }: LoginBody = ctx.request.body;

    ctx.response.status = 400;

    if (username === 'dennis' || username === 'erik') {
        if (password === 'sdu' || password === 'AFPE20') {
            ctx.response.status = 200;

            ctx.body = {
                accessToken: await signAccessToken({
                    firstName: 'Hello',
                    lastName: 'World',
                }),
                refreshToken: await signRefreshToken({}),
            };
        }
    }
});

router.post('/refresh', isAuthenticated, async (ctx, _next) => {
    const { refreshToken } = ctx.request.body;

    verify(refreshToken);

    ctx.body = {
        accessToken: await signAccessToken({
            firstName: 'Hello',
            lastName: 'World',
        }),
    };
});

export default router;
