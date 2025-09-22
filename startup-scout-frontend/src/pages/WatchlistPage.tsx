import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { WatchlistCard } from '../components/WatchlistCard';
import { useWatchlistStore } from '../store/watchlist';
import { useAuthStore } from '../store/auth';

export const WatchlistPage: React.FC = () => {
    const { watchlistItems, isLoading, error, fetchWatchlist } = useWatchlistStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            fetchWatchlist();
        }
    }, [isAuthenticated, fetchWatchlist]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
                        <p className="text-gray-600 mb-4">Please log in to view your watchlist.</p>
                        <Link
                            to="/auth"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner text="Loading your watchlist..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={fetchWatchlist}>Try Again</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (watchlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Watchlist</h1>
                        <EmptyState
                            title="No startups in your watchlist yet"
                            description="Start exploring startups and add them to your watchlist to track your favorites."
                            action={
                                <Link
                                    to="/"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Browse Startups
                                </Link>
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Watchlist</h1>
                            <p className="text-lg text-gray-600">
                                {watchlistItems.length} startup{watchlistItems.length !== 1 ? 's' : ''} you're tracking
                            </p>
                        </div>
                        {watchlistItems.length > 0 && (
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {watchlistItems.length}
                                    </div>
                                    <div className="text-sm text-gray-500">Total Items</div>
                                </div>
                                <div className="h-12 w-px bg-gray-200"></div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">
                                        {watchlistItems.filter(item => item.startup_details?.stage === 'ipo').length}
                                    </div>
                                    <div className="text-sm text-gray-500">IPO Stage</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {watchlistItems.map((item) => (
                        <WatchlistCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
