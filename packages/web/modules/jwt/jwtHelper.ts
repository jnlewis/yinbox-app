import { Config } from 'core/config/config';
import { AuthToken } from 'core/entities/authToken';
import { JWT } from 'core/entities/jwt';
import jwt from 'jsonwebtoken';

export const generateToken = (authToken: AuthToken): string => {
  return jwt.sign(authToken, Config.jwtSecret);

    // jwt.sign({
    //   data: 'foobar'
    // }, 'secret', { expiresIn: '1h' });
};

export const verifyToken = (token: string): AuthToken => {

  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  return jwt.verify(token, Config.jwtSecret);
};
