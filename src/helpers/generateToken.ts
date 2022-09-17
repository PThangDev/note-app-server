import jwt from 'jsonwebtoken';

export const generateActiveToken = (payload: object, expiresIn: string = '5m') => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, { expiresIn });
};

export const generateAccessToken = (payload: object, expiresIn: string = '7d') => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string = '30d') => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn });
};
