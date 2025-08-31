import { Request } from 'express';
import { User } from './database.types';

export interface AuthRequest extends Request {
  user?: User;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}