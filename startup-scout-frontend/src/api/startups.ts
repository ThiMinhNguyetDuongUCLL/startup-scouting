import { apiClient } from './client';
import type { Startup, PaginatedResponse, StartupFilters } from '../types';

export const startupsApi = {
    // Get paginated list of startups with filters
    getStartups: async (filters: StartupFilters = {}): Promise<PaginatedResponse<Startup>> => {
        const params = new URLSearchParams();

        if (filters.q) params.append('q', filters.q);
        if (filters.industry) params.append('industry', filters.industry);
        if (filters.location) params.append('location', filters.location);
        if (filters.stage) params.append('stage', filters.stage);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.ordering) params.append('ordering', filters.ordering);

        const response = await apiClient.get(`/startups/?${params.toString()}`);
        return response.data;
    },

    // Get single startup by ID
    getStartup: async (id: number): Promise<Startup> => {
        const response = await apiClient.get(`/startups/${id}/`);
        return response.data;
    },

    // Get unique values for filters
    getFilterOptions: async () => {
        const response = await apiClient.get('/startups/');
        const startups: Startup[] = response.data.results;

        return {
            industries: [...new Set(startups.map(s => s.industry))].sort(),
            locations: [...new Set(startups.map(s => s.location))].sort(),
            stages: ['idea', 'mvp', 'seed', 'series_a', 'series_b', 'series_c', 'growth', 'ipo'],
        };
    },
};
