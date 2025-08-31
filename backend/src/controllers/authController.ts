import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { credential } = req.body;

      if (!credential) {
        res.status(400).json({ error: 'Google credential is required' });
        return;
      }

      console.log('Attempting to verify Google token...');
      
      // Verify Google token
      const googleUser = await AuthService.verifyGoogleToken(credential);
      
      console.log('Google user verified:', googleUser.email);

      // Find or create user
      const { user, token } = await AuthService.findOrCreateUser(googleUser);
      
      console.log('User authenticated successfully:', user.email);

      res.json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: user.avatar_url
          },
          token
        }
      });
    } catch (error) {
      console.error('Google login error:', error);
      next(error);
    }
  }

  static async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await AuthService.getUserById(req.user.id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: user.avatar_url
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    // Since we're using JWT, logout is handled on the client side
    // by removing the token from storage
    res.json({
      status: 'success',
      message: 'Logged out successfully'
    });
  }
}