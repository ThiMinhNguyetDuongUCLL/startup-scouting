import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useWatchlistStore } from '../store/watchlist';
import { useAuthStore } from '../store/auth';
import { UserProfile } from './UserProfile';

export const Layout: React.FC = () => {
    const location = useLocation();
    const { watchlistItems } = useWatchlistStore();
    const { isAuthenticated } = useAuthStore();
    const watchlistCount = watchlistItems.length;

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 text-xl font-bold text-gray-900"
                            >
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Startup Scout</span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                Browse Startups
                            </Link>

                            {isAuthenticated && (
                                <Link
                                    to="/watchlist"
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/watchlist')
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>Watchlist</span>
                                    {watchlistCount > 0 && (
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                            {watchlistCount}
                                        </span>
                                    )}
                                </Link>
                            )}

                            {isAuthenticated && (
                                <Link
                                    to="/analytics"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/analytics')
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    Analytics
                                </Link>
                            )}

                            {isAuthenticated ? (
                                <UserProfile />
                            ) : (
                                <Link
                                    to="/auth"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2024 Startup Scout. Built with React, TypeScript, and Tailwind CSS.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
