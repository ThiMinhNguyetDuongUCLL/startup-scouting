import React, { useEffect } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { useStartupsStore } from '../store/startups';

export const StartupFilters: React.FC = () => {
    const {
        filters,
        filterOptions,
        isLoadingFilters,
        setFilters,
        clearFilters,
        fetchFilterOptions,
    } = useStartupsStore();

    useEffect(() => {
        fetchFilterOptions();
    }, []); // Only run once on mount

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ q: e.target.value });
    };

    const handleFilterChange = (key: keyof typeof filters) =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilters({ [key]: e.target.value });
        };

    const hasActiveFilters = Object.values(filters).some(value =>
        value && value !== '' && value !== 1
    );

    const stageOptions = filterOptions.stages.map(stage => ({
        value: stage,
        label: stage.replace('_', ' ').toUpperCase(),
    }));

    const industryOptions = filterOptions.industries.map(industry => ({
        value: industry,
        label: industry,
    }));

    const locationOptions = filterOptions.locations.map(location => ({
        value: location,
        label: location,
    }));

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filter Startups</h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Search"
                    placeholder="Search startups..."
                    value={filters.q || ''}
                    onChange={handleSearchChange}
                    leftIcon={
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />

                <Select
                    label="Industry"
                    placeholder="All Industries"
                    value={filters.industry || ''}
                    onChange={handleFilterChange('industry')}
                    options={industryOptions}
                    disabled={isLoadingFilters}
                />

                <Select
                    label="Location"
                    placeholder="All Locations"
                    value={filters.location || ''}
                    onChange={handleFilterChange('location')}
                    options={locationOptions}
                    disabled={isLoadingFilters}
                />

                <Select
                    label="Stage"
                    placeholder="All Stages"
                    value={filters.stage || ''}
                    onChange={handleFilterChange('stage')}
                    options={stageOptions}
                    disabled={isLoadingFilters}
                />
            </div>

            {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {filters.q && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            Search: "{filters.q}"
                            <button
                                onClick={() => setFilters({ q: '' })}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.industry && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Industry: {filters.industry}
                            <button
                                onClick={() => setFilters({ industry: '' })}
                                className="ml-2 text-green-600 hover:text-green-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.location && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                            Location: {filters.location}
                            <button
                                onClick={() => setFilters({ location: '' })}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.stage && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                            Stage: {filters.stage.replace('_', ' ').toUpperCase()}
                            <button
                                onClick={() => setFilters({ stage: '' })}
                                className="ml-2 text-yellow-600 hover:text-yellow-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
