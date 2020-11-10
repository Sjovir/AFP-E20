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
    verify(token);
    await next();
  } catch (err) {
    ctx.throw(401, err);
  }
};
