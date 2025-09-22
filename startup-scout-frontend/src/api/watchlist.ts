import { apiClient } from './client';
import type { WatchlistItem, AddToWatchlistData } from '../types';

export const watchlistApi = {
    // Get all watchlist items
    getWatchlist: async (): Promise<WatchlistItem[]> => {
        const response = await apiClient.get('/watchlist/');
        return response.data.results;
    },

    // Add startup to watchlist
    addToWatchlist: async (data: AddToWatchlistData): Promise<WatchlistItem> => {
        const response = await apiClient.post('/watchlist/', data);
        return response.data;
    },

    // Remove startup from watchlist
    removeFromWatchlist: async (id: number): Promise<void> => {
        await apiClient.delete(`/watchlist/${id}/`);
    },

    // Check if startup is in watchlist
    isInWatchlist: async (startupId: number): Promise<boolean> => {
        try {
            const watchlist = await watchlistApi.getWatchlist();
            return watchlist.some(item => item.startup === startupId);
        } catch {
            return false;
        }
    },
};
