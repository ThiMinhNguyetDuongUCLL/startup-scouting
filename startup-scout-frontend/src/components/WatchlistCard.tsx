import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useWatchlistStore } from '../store/watchlist';
import type { WatchlistItem } from '../api/watchlist';

interface WatchlistCardProps {
    item: WatchlistItem;
}

export const WatchlistCard: React.FC<WatchlistCardProps> = ({ item }) => {
    const { removeFromWatchlist } = useWatchlistStore();
    const { startup_details } = item;

    const handleRemoveFromWatchlist = async () => {
        await removeFromWatchlist(item.startup);
    };

    const getStageColor = (stage: string) => {
        const colors: Record<string, string> = {
            idea: 'bg-gray-100 text-gray-800',
            mvp: 'bg-blue-100 text-blue-800',
            seed: 'bg-green-100 text-green-800',
            series_a: 'bg-purple-100 text-purple-800',
            series_b: 'bg-orange-100 text-orange-800',
            series_c: 'bg-red-100 text-red-800',
            growth: 'bg-yellow-100 text-yellow-800',
            ipo: 'bg-indigo-100 text-indigo-800',
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
    };

    const formatStage = (stage: string) => {
        return stage.replace('_', ' ').toUpperCase();
    };

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
                {/* Header with startup name and stage */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {item.startup_name}
                        </h3>
                        {startup_details?.stage && (
                            <Badge className={`${getStageColor(startup_details.stage)} text-xs font-medium`}>
                                {formatStage(startup_details.stage)}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Startup details */}
                {startup_details && (
                    <div className="space-y-3 mb-6">
                        {/* Industry and Location */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="font-medium">{startup_details.industry}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{startup_details.location}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {startup_details.description}
                        </p>

                        {/* Tags */}
                        {startup_details.tag_list && startup_details.tag_list.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {startup_details.tag_list.slice(0, 3).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {startup_details.tag_list.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                        +{startup_details.tag_list.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Website link */}
                        {startup_details.website && (
                            <div className="flex items-center text-sm">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <a
                                    href={startup_details.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium truncate"
                                >
                                    Visit Website
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Added date */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Added {new Date(item.created_at).toLocaleDateString()}</span>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <div className="flex gap-3 w-full">
                    <Link
                        to={`/startup/${item.startup}`}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                        View Details
                    </Link>
                    <Button
                        onClick={handleRemoveFromWatchlist}
                        variant="outline"
                        className="px-4 py-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
