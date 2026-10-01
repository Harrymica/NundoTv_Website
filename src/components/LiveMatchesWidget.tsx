'use client';

import React, { useEffect, useState } from 'react';
import HlsPlayer from './HlsPlayer';

interface Match {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeLogo?: string;
    awayLogo?: string;
    league: string;
    kickOffTime: string;
    status: string;
    score: string;
    streamUrl?: string;
}

export default function LiveMatchesWidget() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMatch, setActiveMatch] = useState<Match | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5295';

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await fetch(`${API_URL}/api/sports/matches?category=Football`);
                if (res.ok) {
                    const data = await res.json();
                    setMatches(data);
                }
            } catch (err) {
                console.error('Error fetching live matches:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
        const interval = setInterval(fetchMatches, 30000);
        return () => clearInterval(interval);
    }, [API_URL]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 bg-black/60 rounded-2xl border border-white/10 text-gray-400">
                <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                Loading Live Fixtures...
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="p-6 bg-black/60 rounded-2xl border border-white/10 text-gray-400 text-center">
                No active live matches currently available. Check back soon!
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {activeMatch && (
                <HlsPlayer
                    streamUrl={activeMatch.streamUrl}
                    title={`${activeMatch.homeTeam} vs ${activeMatch.awayTeam}`}
                    onClose={() => setActiveMatch(null)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.slice(0, 6).map((match) => (
                    <div
                        key={match.id}
                        className="bg-black/70 border border-white/10 hover:border-brand/60 transition-all rounded-xl p-4 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                            <span className="uppercase tracking-wider font-semibold text-brand">{match.league}</span>
                            <span className="bg-brand/20 text-brand px-2 py-0.5 rounded font-bold">{match.kickOffTime || 'LIVE'}</span>
                        </div>

                        <div className="flex items-center justify-between my-2">
                            <div className="flex flex-col items-center flex-1">
                                <span className="font-bold text-white text-center text-sm md:text-base">{match.homeTeam}</span>
                            </div>

                            <div className="px-4 text-center">
                                <span className="text-xl font-black text-brand tracking-widest">{match.score || 'VS'}</span>
                            </div>

                            <div className="flex flex-col items-center flex-1">
                                <span className="font-bold text-white text-center text-sm md:text-base">{match.awayTeam}</span>
                            </div>
                        </div>

                        {match.streamUrl && (
                            <button
                                onClick={() => setActiveMatch(match)}
                                className="mt-3 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Watch Stream
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
