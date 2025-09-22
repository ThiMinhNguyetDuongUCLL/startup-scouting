import { apiClient } from './client';
import type { Note, CreateNoteData } from '../types';

export const notesApi = {
    // Get notes for a specific startup
    getNotes: async (startupId: number): Promise<Note[]> => {
        const response = await apiClient.get(`/notes/?startup=${startupId}`);
        return response.data.results;
    },

    // Create a new note
    createNote: async (data: CreateNoteData): Promise<Note> => {
        const response = await apiClient.post('/notes/', data);
        return response.data;
    },

    // Update a note
    updateNote: async (id: number, data: Partial<CreateNoteData>): Promise<Note> => {
        const response = await apiClient.patch(`/notes/${id}/`, data);
        return response.data;
    },

    // Delete a note
    deleteNote: async (id: number): Promise<void> => {
        await apiClient.delete(`/notes/${id}/`);
    },
};
