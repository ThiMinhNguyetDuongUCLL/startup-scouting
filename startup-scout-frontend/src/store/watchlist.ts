import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
    // Local state for optimistic updates
    watchlistItems: number[]; // Array of startup IDs
    isLoading: boolean;
    error: string | null;

    // Actions
    addToWatchlist: (startupId: number) => void;
    removeFromWatchlist: (startupId: number) => void;
    isInWatchlist: (startupId: number) => boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            watchlistItems: [],
            isLoading: false,
            error: null,

            addToWatchlist: (startupId: number) => {
                set((state) => ({
                    watchlistItems: [...state.watchlistItems, startupId],
                    error: null,
                }));
            },

            removeFromWatchlist: (startupId: number) => {
                set((state) => ({
                    watchlistItems: state.watchlistItems.filter(id => id !== startupId),
                }));
            },

            isInWatchlist: (startupId: number) => {
                return get().watchlistItems.includes(startupId);
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            setError: (error: string | null) => {
                set({ error });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'startup-scout-watchlist',
            // Only persist the watchlist items, not loading/error states
            partialize: (state) => ({ watchlistItems: state.watchlistItems }),
        }
    )
);
