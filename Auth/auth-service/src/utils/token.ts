import jwt from "jsonwebtoken";

export const verify = async (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const decode = async (token: string) => {
    return jwt.decode(token);
}

export const signAccessToken = async (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '5m'
    });
}

export const signRefreshToken = async (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '9h'
    });
}
