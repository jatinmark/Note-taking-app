import { Response, NextFunction } from 'express';
import { NoteService } from '../services/noteService';
import { AuthRequest } from '../middleware/auth';

export class NoteController {
  static async getNotes(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const notes = await NoteService.getAllNotes(req.user.id);
      res.json({
        status: 'success',
        data: notes
      });
    } catch (error) {
      next(error);
    }
  }

  static async getNote(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { id } = req.params;
      const note = await NoteService.getNoteById(id, req.user.id);
      
      if (!note) {
        res.status(404).json({
          status: 'error',
          message: 'Note not found'
        });
        return;
      }

      res.json({
        status: 'success',
        data: note
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNote(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { title, content } = req.body;
      const note = await NoteService.createNote({
        user_id: req.user.id,
        title,
        content
      });

      res.status(201).json({
        status: 'success',
        data: note
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNote(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { id } = req.params;
      const { title, content } = req.body;
      
      const note = await NoteService.updateNote(id, req.user.id, {
        title,
        content
      });

      res.json({
        status: 'success',
        data: note
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { id } = req.params;
      await NoteService.deleteNote(id, req.user.id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}