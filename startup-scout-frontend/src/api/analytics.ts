import { apiClient } from './client';

export interface AnalyticsData {
    user_stats: {
        watchlist_count: number;
        notes_count: number;
        total_startups_available: number;
    };
    user_analytics: {
        industries: Array<{ industry: string; count: number }>;
        locations: Array<{ location: string; count: number }>;
        stages: Array<{ stage: string; count: number }>;
    };
    global_analytics: {
        industries: Array<{ industry: string; count: number }>;
        locations: Array<{ location: string; count: number }>;
    };
}

export const analyticsApi = {
    getDashboard: async (): Promise<AnalyticsData> => {
        const response = await apiClient.get('/analytics/dashboard/');
        return response.data;
    },

    exportWatchlist: async (): Promise<Blob> => {
        const response = await apiClient.get('/analytics/export/watchlist/', {
            responseType: 'blob',
        });
        return response.data;
    },
};
