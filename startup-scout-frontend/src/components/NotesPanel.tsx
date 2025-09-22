import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/Spinner';
import { EmptyState, EmptyStateIcons } from './ui/EmptyState';
import { notesApi } from '../api/notes';
import type { Note, CreateNoteData } from '../types';
import { CreateNoteSchema } from '../types';

interface NotesPanelProps {
  startupId: number;
  startupName: string;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ startupId, startupName }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteData>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      startup: startupId,
      content: '',
    },
  });

  useEffect(() => {
    fetchNotes();
  }, [startupId]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedNotes = await notesApi.getNotes(startupId);
      setNotes(fetchedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CreateNoteData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newNote = await notesApi.createNote(data);
      setNotes(prev => [newNote, ...prev]);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Note Form */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Add Note</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <textarea
                {...register('content')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Add a note about ${startupName}...`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Note...' : 'Add Note'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Notes ({notes.length})
          </h3>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSpinner text="Loading notes..." />
          ) : notes.length === 0 ? (
            <EmptyState
              icon={EmptyStateIcons.document}
              title="No notes yet"
              description={`Be the first to add a note about ${startupName}.`}
            />
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-500">
                      {formatDate(note.created_at)}
                    </p>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
