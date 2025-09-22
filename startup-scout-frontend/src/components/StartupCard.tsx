import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import type { Startup } from '../types';
import { useWatchlistStore } from '../store/watchlist';

interface StartupCardProps {
    startup: Startup;
    onAddToWatchlist?: (startupId: number) => void;
}

export const StartupCard: React.FC<StartupCardProps> = ({
    startup,
    onAddToWatchlist
}) => {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
    const isWatched = isInWatchlist(startup.id);

    const handleWatchlistToggle = async () => {
        if (isWatched) {
            await removeFromWatchlist(startup.id);
        } else {
            await addToWatchlist(startup.id);
            onAddToWatchlist?.(startup.id);
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

    return (
        <Card hover className="h-full flex flex-col">
            <CardContent className="flex-1">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {startup.name}
                    </h3>
                    <Badge variant={getStageVariant(startup.stage)} size="sm">
                        {formatStage(startup.stage)}
                    </Badge>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {startup.location}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {startup.industry}
                    </div>

                    {startup.website && (
                        <div className="flex items-center text-sm text-blue-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <a
                                href={startup.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Visit Website
                            </a>
                        </div>
                    )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {startup.description}
                </p>

                {startup.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {startup.tag_list.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                                {tag}
                            </Badge>
                        ))}
                        {startup.tag_list.length > 3 && (
                            <Badge variant="secondary" size="sm">
                                +{startup.tag_list.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-0">
                <div className="flex w-full gap-2">
                    <Link
                        to={`/startup/${startup.id}`}
                        className="flex-1"
                    >
                        <Button variant="outline" className="w-full">
                            View Details
                        </Button>
                    </Link>
                    <Button
                        variant={isWatched ? "secondary" : "primary"}
                        size="sm"
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
                        {isWatched ? 'Watching' : 'Watch'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
