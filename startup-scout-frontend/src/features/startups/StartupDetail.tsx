import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/Spinner';
import { EmptyState, EmptyStateIcons } from '../../components/ui/EmptyState';
import { NotesPanel } from '../../components/NotesPanel';
import { startupsApi } from '../../api/startups';
import { useWatchlistStore } from '../../store/watchlist';
import type { Startup } from '../../types';

export const StartupDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [startup, setStartup] = useState<Startup | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
    const isWatched = startup ? isInWatchlist(startup.id) : false;

    useEffect(() => {
        if (id) {
            fetchStartup(parseInt(id));
        }
    }, [id]);

    const fetchStartup = async (startupId: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const startupData = await startupsApi.getStartup(startupId);
            setStartup(startupData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch startup');
        } finally {
            setIsLoading(false);
        }
    };

    const handleWatchlistToggle = () => {
        if (!startup) return;

        if (isWatched) {
            removeFromWatchlist(startup.id);
        } else {
            addToWatchlist(startup.id);
        }
    };

    const getStageVariant = (stage: string) => {
        const stageMap: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'> = {
            'idea': 'default',
            'mvp': 'secondary',
            'seed': 'info',
            'series_a': 'success',
            'series_b': 'success',
            'series_c': 'success',
            'growth': 'warning',
            'ipo': 'danger',
        };
        return stageMap[stage] || 'default';
    };

    const formatStage = (stage: string) => {
        return stage.replace('_', ' ').toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading startup details..." />
            </div>
        );
    }

    if (error || !startup) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <EmptyState
                    icon={EmptyStateIcons.folder}
                    title={error ? "Error Loading Startup" : "Startup Not Found"}
                    description={error || "The startup you're looking for doesn't exist."}
                    action={
                        <div className="space-x-4">
                            <Button onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/')}>
                                Browse Startups
                            </Button>
                        </div>
                    }
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        }
                    >
                        Back
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Startup Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {startup.name}
                                        </h1>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {startup.location}
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                {startup.industry}
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(startup.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Badge variant={getStageVariant(startup.stage)} size="lg">
                                            {formatStage(startup.stage)}
                                        </Badge>
                                        <Button
                                            variant={isWatched ? "secondary" : "primary"}
                                            onClick={handleWatchlistToggle}
                                            leftIcon={
                                                isWatched ? (
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                )
                                            }
                                        >
                                            {isWatched ? 'Watching' : 'Add to Watchlist'}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {startup.website && (
                                    <div className="mb-6">
                                        <a
                                            href={startup.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Visit Website
                                        </a>
                                    </div>
                                )}

                                <div className="prose max-w-none">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{startup.description}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        {startup.tag_list.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {startup.tag_list.map((tag, index) => (
                                            <Badge key={index} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <NotesPanel startupId={startup.id} startupName={startup.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};
