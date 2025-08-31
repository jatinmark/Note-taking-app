import { OAuth2Client } from 'google-auth-library';
import { supabase } from '../config/supabase';
import { User, UserInsert } from '../types/database.types';
import { generateToken } from '../utils/jwt';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
  static async verifyGoogleToken(idToken: string) {
    try {
      if (!process.env.GOOGLE_CLIENT_ID) {
        throw new Error('GOOGLE_CLIENT_ID is not configured in environment variables');
      }

      console.log('Verifying token with Google Client ID:', process.env.GOOGLE_CLIENT_ID);
      
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid token payload');
      }

      return {
        google_id: payload.sub,
        email: payload.email!,
        name: payload.name || null,
        avatar_url: payload.picture || null
      };
    } catch (error) {
      console.error('Google token verification error:', error);
      throw new Error(`Failed to verify Google token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async findOrCreateUser(googleUser: {
    google_id: string;
    email: string;
    name: string | null;
    avatar_url: string | null;
  }): Promise<{ user: User; token: string }> {
    try {
      console.log('Finding or creating user for:', googleUser.email);
      
      // Check if user exists
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('google_id', googleUser.google_id)
        .single();

      if (existingUser && !findError) {
        console.log('Existing user found:', existingUser.email);
        // User exists, generate token
        const token = generateToken(existingUser);
        return { user: existingUser, token };
      }

      // If error is not "not found", throw it
      if (findError && findError.code !== 'PGRST116') {
        console.error('Error finding user:', findError);
        throw new Error(`Database error: ${findError.message}`);
      }

      console.log('Creating new user for:', googleUser.email);
      
      // Create new user
      const newUser: UserInsert = {
        email: googleUser.email,
        name: googleUser.name,
        avatar_url: googleUser.avatar_url,
        google_id: googleUser.google_id,
        provider: 'google'
      };

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert(newUser)
        .select()
        .single();

      if (createError || !createdUser) {
        console.error('Error creating user:', createError);
        throw new Error(`Failed to create user: ${createError?.message || 'Unknown error'}`);
      }

      console.log('New user created successfully:', createdUser.email);
      const token = generateToken(createdUser);
      return { user: createdUser, token };
    } catch (error) {
      console.error('findOrCreateUser error:', error);
      throw error;
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }
}