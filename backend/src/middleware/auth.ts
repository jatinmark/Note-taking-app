import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/database.types';
import { AuthRequest } from '../types/express';

export { AuthRequest };

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const secret = process.env.JWT_SECRET as string;
  
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = decoded as User;
    next();
  });
};