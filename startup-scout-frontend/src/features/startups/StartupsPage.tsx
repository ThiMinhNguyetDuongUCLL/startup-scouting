import React, { useEffect } from 'react';
import { StartupCard } from '../../components/StartupCard';
import { StartupFilters } from '../../components/StartupFilters';
import { Pagination } from '../../components/Pagination';
import { LoadingSpinner } from '../../components/ui/Spinner';
import { EmptyState, EmptyStateIcons } from '../../components/ui/EmptyState';
import { useStartupsStore } from '../../store/startups';
import { useWatchlistStore } from '../../store/watchlist';
import { useAuthStore } from '../../store/auth';

export const StartupsPage: React.FC = () => {
  const {
    startups,
    pagination,
    filters,
    isLoading,
    error,
    fetchStartups,
    setPage,
    clearError,
  } = useStartupsStore();

  const { addToWatchlist, fetchWatchlist } = useWatchlistStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchStartups();
    if (isAuthenticated) {
      fetchWatchlist();
    }
  }, [isAuthenticated]); // Run when authentication status changes

  useEffect(() => {
    // Debounce search and filters - only fetch if filters actually changed (excluding page)
    const timeoutId = setTimeout(() => {
      fetchStartups();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters.q, filters.industry, filters.location, filters.stage, filters.ordering]); // Only depend on specific filter values, not page

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchStartups(); // Fetch new page data
  };

  const handleAddToWatchlist = (startupId: number) => {
    addToWatchlist(startupId);
  };

  const totalPages = Math.ceil(pagination.count / 20); // Assuming 20 items per page

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-red-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Startups</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => {
                clearError();
                fetchStartups();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Startup Scout</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover and track innovative startups
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <StartupFilters />
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {isLoading ? 'Loading...' : `${pagination.count} startups found`}
            </h2>
          </div>

          {isLoading ? (
            <LoadingSpinner text="Loading startups..." />
          ) : startups.length === 0 ? (
            <EmptyState
              icon={EmptyStateIcons.search}
              title="No startups found"
              description="Try adjusting your search criteria or filters to find more startups."
            />
          ) : (
            <>
              {/* Startup Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {startups.map((startup) => (
                  <StartupCard
                    key={startup.id}
                    startup={startup}
                    onAddToWatchlist={handleAddToWatchlist}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
