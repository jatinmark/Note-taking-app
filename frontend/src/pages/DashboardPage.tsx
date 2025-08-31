import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

interface Note {
  id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(response.data.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.title && !newNote.content) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/notes`,
        newNote,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNotes([response.data.data, ...notes]);
      setNewNote({ title: '', content: '' });
      setShowNewNote(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNote) return;

    try {
      const response = await axios.put(
        `${API_URL}/api/notes/${editingNote.id}`,
        {
          title: editingNote.title,
          content: editingNote.content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNotes(notes.map(note => 
        note.id === editingNote.id ? response.data.data : note
      ));
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center h-16 pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8">
          {/* Logo on left corner - equal width */}
          <div className="flex-1 flex items-center">
            <img 
              src="/src/assets/top.svg" 
              alt="HD Logo"
              className="h-8 sm:h-10"
            />
          </div>
          
          {/* Account info on right - equal width */}
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {user?.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={user.name || 'User'}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                />
              )}
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user?.name || user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pl-[10%] pr-4 sm:pr-6 lg:pr-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-gray-600">Start creating and managing your notes</p>
        </div>

        {/* New Note Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowNewNote(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Note
          </button>
        </div>

        {/* New Note Form */}
        {showNewNote && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleCreateNote}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowNewNote(false);
                  setNewNote({ title: '', content: '' });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                {editingNote?.id === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingNote.title || ''}
                      onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                    />
                    <textarea
                      value={editingNote.content || ''}
                      onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded mb-2 h-24"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateNote}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {note.title || 'Untitled'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {note.content || 'No content'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {new Date(note.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingNote(note)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;