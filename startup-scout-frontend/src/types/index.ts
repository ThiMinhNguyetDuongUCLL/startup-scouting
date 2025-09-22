import { z } from 'zod';

// Startup schema
export const StartupSchema = z.object({
    id: z.number(),
    name: z.string(),
    website: z.string().nullable(),
    location: z.string(),
    industry: z.string(),
    stage: z.enum(['idea', 'mvp', 'seed', 'series_a', 'series_b', 'series_c', 'growth', 'ipo']),
    description: z.string(),
    tags: z.string(),
    tag_list: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
});

// Note schema
export const NoteSchema = z.object({
    id: z.number(),
    startup: z.number(),
    startup_name: z.string(),
    content: z.string(),
    created_at: z.string(),
});

// WatchlistItem schema
export const WatchlistItemSchema = z.object({
    id: z.number(),
    startup: z.number(),
    startup_name: z.string(),
    created_at: z.string(),
});

// API Response schemas
export const PaginatedResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.unknown()),
});

// Type exports
export type Startup = z.infer<typeof StartupSchema>;
export type Note = z.infer<typeof NoteSchema>;
export type WatchlistItem = z.infer<typeof WatchlistItemSchema>;
export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

// API Query parameters
export interface StartupFilters {
    q?: string;
    industry?: string;
    location?: string;
    stage?: string;
    page?: number;
    ordering?: string;
}

// Form schemas
export const CreateNoteSchema = z.object({
    startup: z.number(),
    content: z.string().min(1, 'Note content is required'),
});

export const AddToWatchlistSchema = z.object({
    startup: z.number(),
});

export type CreateNoteData = z.infer<typeof CreateNoteSchema>;
export type AddToWatchlistData = z.infer<typeof AddToWatchlistSchema>;
