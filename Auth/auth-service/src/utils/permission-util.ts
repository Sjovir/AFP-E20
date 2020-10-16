import Koa from 'koa';

import { verify } from './token';

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

// Converting them to hashmaps and then compare might be a faster solution.
// Use more RAM and less CPU.
export const hasPermissions = (
    current: Array<string>,
    compare: string | Array<string>
): boolean => {
    if (Array.isArray(compare)) {
        for (const comparePerm of compare) {
            let found = false;
            for (const currPerm of current) {
                if (currPerm === comparePerm) {
                    found = true;
                    break;
                }
            }

            if (!found) return false;
        }

        return true;
    }

    for (const currPerm of current) {
        if (currPerm === compare) {
            return true;
        }
    }

    return false;
};
