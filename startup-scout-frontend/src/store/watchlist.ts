import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { watchlistApi } from '../api/watchlist';
import { useAuthStore } from './auth';

interface WatchlistItem {
    id: number;
    startup: number;
    startup_name: string;
    created_at: string;
}

interface WatchlistState {
    // Local state for optimistic updates
    watchlistItems: WatchlistItem[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchWatchlist: () => Promise<void>;
    addToWatchlist: (startupId: number) => Promise<void>;
    removeFromWatchlist: (startupId: number) => Promise<void>;
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

            fetchWatchlist: async () => {
                const { isAuthenticated } = useAuthStore.getState();
                if (!isAuthenticated) {
                    set({ watchlistItems: [] });
                    return;
                }

                set({ isLoading: true, error: null });
                try {
                    const items = await watchlistApi.getWatchlist();
                    set({ watchlistItems: items, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch watchlist',
                        isLoading: false,
                    });
                }
            },

            addToWatchlist: async (startupId: number) => {
                const { isAuthenticated } = useAuthStore.getState();
                if (!isAuthenticated) {
                    set({ error: 'Please log in to add items to your watchlist' });
                    return;
                }

                set({ isLoading: true, error: null });
                try {
                    const newItem = await watchlistApi.addToWatchlist(startupId);
                    set((state) => ({
                        watchlistItems: [...state.watchlistItems, newItem],
                        isLoading: false,
                    }));
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to add to watchlist',
                        isLoading: false,
                    });
                }
            },

            removeFromWatchlist: async (startupId: number) => {
                const { isAuthenticated } = useAuthStore.getState();
                if (!isAuthenticated) {
                    return;
                }

                set({ isLoading: true, error: null });
                try {
                    await watchlistApi.removeFromWatchlist(startupId);
                    set((state) => ({
                        watchlistItems: state.watchlistItems.filter(item => item.startup !== startupId),
                        isLoading: false,
                    }));
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to remove from watchlist',
                        isLoading: false,
                    });
                }
            },

            isInWatchlist: (startupId: number) => {
                return get().watchlistItems.some(item => item.startup === startupId);
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
