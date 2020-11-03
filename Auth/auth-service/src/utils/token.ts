import jwt from 'jsonwebtoken';

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

export const signAccessToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5h',
  });
};

export const signRefreshToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '9h',
  });
};
