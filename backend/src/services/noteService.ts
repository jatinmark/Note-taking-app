import { supabase } from '../config/supabase';
import { Note, NoteInsert, NoteUpdate } from '../types/database.types';

export class NoteService {
  static async getAllNotes(userId: string): Promise<Note[]> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching notes: ${error.message}`);
    }

    return data || [];
  }

  static async getNoteById(noteId: string, userId: string): Promise<Note | null> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Note not found
      }
      throw new Error(`Error fetching note: ${error.message}`);
    }

    return data;
  }

  static async createNote(note: NoteInsert): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .insert(note)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating note: ${error.message}`);
    }

    return data;
  }

  static async updateNote(noteId: string, userId: string, updates: NoteUpdate): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', noteId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }

    return data;
  }

  static async deleteNote(noteId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error deleting note: ${error.message}`);
    }
  }
}