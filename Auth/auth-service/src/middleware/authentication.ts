import Koa from 'koa';

import { verify } from '../utils/token';

const getAuthorizationToken = (header: string | undefined): string | null => {
    if (!header) return null;

    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};

export const isAuthenticated = async (ctx: Koa.Context, next: Koa.Next) => {
    const token = getAuthorizationToken(ctx.headers.authorization);

    try {
        const verified = verify(token);
        console.log(verified);
        await next();
    } catch (err) {
        ctx.response.status = 401;
        ctx.response.body = err;
    }
};
