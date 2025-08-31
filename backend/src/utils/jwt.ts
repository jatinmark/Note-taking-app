import jwt from 'jsonwebtoken';
import { User } from '../types/database.types';

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar_url: user.avatar_url
  };

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  return jwt.sign(payload, secret, { expiresIn } as any);
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret);
};