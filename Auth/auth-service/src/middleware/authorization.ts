import Koa from 'koa';
import { hasPermissions } from '../utils/permission-util';
import { decode } from '../utils/token';

const getAccessToken = (header: string | undefined): string | null => {
  if (!header) return null;

  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};

export const isAuthorized = (requiredPermissions: string | string[]) => async (
  ctx: Koa.Context,
  next: Koa.Next
): Promise<void> => {
  const token = getAccessToken(ctx.header.authorization);

  try {
    const accessToken = <IDecodedAccessToken>decode(token);

    if (
      accessToken?.permissions &&
      hasPermissions(accessToken.permissions, requiredPermissions)
    ) {
      await next();
    } else {
      ctx.throw(403, 'User is not authorized');
    }
  } catch (err) {
    ctx.throw(400, err);
  }
};
