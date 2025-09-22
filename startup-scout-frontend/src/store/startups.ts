import { create } from 'zustand';
import type { Startup, StartupFilters, PaginatedResponse } from '../types';
import { startupsApi } from '../api/startups';

interface StartupsState {
  // Data
  startups: Startup[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
  };
  filters: StartupFilters;
  filterOptions: {
    industries: string[];
    locations: string[];
    stages: string[];
  };

  // Loading states
  isLoading: boolean;
  isLoadingFilters: boolean;
  error: string | null;

  // Actions
  fetchStartups: (filters?: Partial<StartupFilters>) => Promise<void>;
  fetchFilterOptions: () => Promise<void>;
  setFilters: (filters: Partial<StartupFilters>) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const initialFilters: StartupFilters = {
  q: '',
  industry: '',
  location: '',
  stage: '',
  page: 1,
  ordering: '-created_at',
};

export const useStartupsStore = create<StartupsState>((set, get) => ({
  startups: [],
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  },
  filters: initialFilters,
  filterOptions: {
    industries: [],
    locations: [],
    stages: [],
  },
  isLoading: false,
  isLoadingFilters: false,
  error: null,

  fetchStartups: async (newFilters?: Partial<StartupFilters>) => {
    set({ isLoading: true, error: null });

    try {
      const currentFilters = get().filters;
      const filters = { ...currentFilters, ...newFilters };

      const response: PaginatedResponse<Startup> = await startupsApi.getStartups(filters);

      set({
        startups: response.results,
        pagination: {
          count: response.count,
          next: response.next,
          previous: response.previous,
          currentPage: filters.page || 1,
        },
        filters,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch startups',
        isLoading: false,
      });
    }
  },

  fetchFilterOptions: async () => {
    set({ isLoadingFilters: true });

    try {
      const options = await startupsApi.getFilterOptions();
      set({
        filterOptions: options,
        isLoadingFilters: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch filter options',
        isLoadingFilters: false,
      });
    }
  },

  setFilters: (newFilters: Partial<StartupFilters>) => {
    const currentFilters = get().filters;
    const filters = { ...currentFilters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: initialFilters });
  },

  setPage: (page: number) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
