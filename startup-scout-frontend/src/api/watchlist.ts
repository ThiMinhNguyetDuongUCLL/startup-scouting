import { apiClient } from './client';

export interface WatchlistItem {
    id: number;
    startup: number;
    startup_name: string;
    user_username: string;
    created_at: string;
}

export const watchlistApi = {
    // Get all watchlist items
    getWatchlist: async (): Promise<WatchlistItem[]> => {
        const response = await apiClient.get('/watchlist/');
        return response.data.results;
    },

    // Add startup to watchlist
    addToWatchlist: async (startupId: number): Promise<WatchlistItem> => {
        const response = await apiClient.post('/watchlist/', { startup: startupId });
        return response.data;
    },

    // Remove startup from watchlist
    removeFromWatchlist: async (startupId: number): Promise<void> => {
        // First get the watchlist item ID for this startup
        const watchlist = await watchlistApi.getWatchlist();
        const item = watchlist.find(item => item.startup === startupId);
        if (item) {
            await apiClient.delete(`/watchlist/${item.id}/`);
        }
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
