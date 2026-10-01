'use client';

import React, { useEffect, useState, useMemo } from 'react';
import HlsPlayer from '../../components/HlsPlayer';
import Navbar from '../../components/Navbar';

interface StreamChannel {
    id: string | number;
    channelName: string;
    channelId: string;
    category?: string;
    description?: string;
}

const DADDYLIVE_247_CHANNELS: StreamChannel[] = [
    // Premier Football & Sports Channels
    { id: '415', channelName: 'SuperSport LaLiga', channelId: '415', category: 'Football', description: 'Spanish LaLiga live 24/7 coverage & matches' },
    { id: '414', channelName: 'SuperSport Premier League', channelId: '414', category: 'Football', description: 'English Premier League live 24/7 matches & analysis' },
    { id: '123', channelName: 'Astro SuperSport 1', channelId: '123', category: 'Sports', description: 'Live Premier League & International Football' },
    { id: '124', channelName: 'Astro SuperSport 2', channelId: '124', category: 'Sports', description: 'Live UEFA & World Sports Coverage' },
    { id: '125', channelName: 'Astro SuperSport 3', channelId: '125', category: 'Sports', description: 'Motorsports, Tennis & Combat Sports' },
    { id: '126', channelName: 'Astro SuperSport 4', channelId: '126', category: 'Sports', description: 'Basketball & World Championship Events' },
    { id: '134', channelName: 'Arena Sport 1 Premium', channelId: '134', category: 'Sports', description: 'UEFA Champions League & Serie A Live' },
    { id: '135', channelName: 'Arena Sport 2 Premium', channelId: '135', category: 'Sports', description: 'Ligue 1 & European Live Football' },
    { id: '136', channelName: 'Arena Sport 3 Premium', channelId: '136', category: 'Sports', description: 'Balkan & European Sports Network' },

    // General TV & Movies
    { id: '51', channelName: 'ABC USA', channelId: '51', category: 'Entertainment', description: 'American Broadcasting Company 24/7 Network' },
    { id: '302', channelName: 'A&E USA', channelId: '302', category: 'Entertainment', description: 'Crime, Documentaries & Reality Series' },
    { id: '303', channelName: 'AMC USA', channelId: '303', category: 'Movies', description: 'Blockbuster Movies & Classic Series' },
    { id: '304', channelName: 'Animal Planet USA', channelId: '304', category: 'Documentary', description: 'Wildlife & Nature Documentaries' },
    { id: '283', channelName: 'Antenna TV USA', channelId: '283', category: 'Entertainment', description: 'Classic Television Broadcasts' },
    { id: '307', channelName: 'Bravo TV USA', channelId: '307', category: 'Entertainment', description: 'Reality TV, Lifestyle & Talk Shows' },
    { id: '766', channelName: 'FOX Network', channelId: '766', category: 'Entertainment', description: 'Live Series & Prime Time Entertainment' },
    { id: '768', channelName: 'FOX Sports 1 (FS1)', channelId: '768', category: 'Sports', description: 'Major League Sports, Racing & Live College Sports' },
    { id: '769', channelName: 'NBC Sports', channelId: '769', category: 'Sports', description: 'Live Premier League & US Sports' },
];

export default function ChannelsPage() {
    const [channels, setChannels] = useState<StreamChannel[]>(DADDYLIVE_247_CHANNELS);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedChannel, setSelectedChannel] = useState<StreamChannel | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5295';

    useEffect(() => {
        const fetchLiveMatchesAsChannels = async () => {
            try {
                const res = await fetch(`${API_URL}/api/sports/matches`);
                if (res.ok) {
                    const matches = await res.json();
                    if (Array.isArray(matches) && matches.length > 0) {
                        const matchChannels: StreamChannel[] = matches.map((m: any) => {
                            // Extract stream channel ID if streamUrl contains stream-XXX.php
                            let chId = '415';
                            if (m.streamUrl) {
                                const matchIdPattern = m.streamUrl.match(/stream-(\d+)\.php/);
                                if (matchIdPattern && matchIdPattern[1]) {
                                    chId = matchIdPattern[1];
                                }
                            }
                            return {
                                id: m.id,
                                channelName: `${m.homeTeam} vs ${m.awayTeam}`,
                                channelId: chId,
                                category: m.category || 'Live Match',
                                description: `${m.league} • ${m.kickOffTime || 'LIVE'}`,
                            };
                        });

                        // Merge static 24/7 channels with live scraped match channels
                        setChannels([...DADDYLIVE_247_CHANNELS, ...matchChannels]);
                    }
                }
            } catch (err) {
                console.warn('[ChannelsPage] API fetch fallback to static 24/7 channels:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLiveMatchesAsChannels();
    }, [API_URL]);

    const categories = useMemo(() => {
        const cats = new Set<string>(['All']);
        channels.forEach(ch => {
            if (ch.category) cats.add(ch.category);
        });
        return Array.from(cats);
    }, [channels]);

    const filteredChannels = useMemo(() => {
        return channels.filter(ch => {
            const matchesCat = selectedCategory === 'All' || (ch.category && ch.category.toLowerCase() === selectedCategory.toLowerCase());
            if (!matchesCat) return false;

            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase().trim();
            return (
                ch.channelName.toLowerCase().includes(query) ||
                ch.channelId.toString().includes(query) ||
                (ch.category && ch.category.toLowerCase().includes(query)) ||
                (ch.description && ch.description.toLowerCase().includes(query))
            );
        });
    }, [channels, searchQuery, selectedCategory]);

    const handleSelectChannel = (channel: StreamChannel) => {
        setSelectedChannel(channel);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
            <Navbar />

            <div className="container mx-auto px-4 pt-28 pb-12 flex-1 max-w-7xl">
                {/* Hero Header Title */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-500/30">
                        Ad-Free 24/7 TV Streams
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-4">
                        DADDYLIVE <span className="text-red-600">24/7 TV & SPORTS</span> CHANNELS
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Stream live sports networks, movies, and entertainment directly in ultra HD quality without popups, redirects, or third-party ads.
                    </p>
                </div>

                {/* Active Player Canvas */}
                {selectedChannel && (
                    <div className="mb-10 animate-fade-in">
                        <HlsPlayer
                            channelId={selectedChannel.channelId}
                            title={`${selectedChannel.channelName} (Channel ID: ${selectedChannel.channelId})`}
                            onClose={() => setSelectedChannel(null)}
                        />
                    </div>
                )}

                {/* Search Bar & Category Pills Bar */}
                <div className="flex flex-col gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-8 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Search channel name or ID (e.g. SuperSport, LaLiga, 415)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="text-xs text-gray-400 font-medium">
                            Showing <span className="text-white font-bold">{filteredChannels.length}</span> live channels
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isSelected
                                        ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                                        : 'bg-slate-950/80 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading 24/7 stream directory...</span>
                    </div>
                ) : (
                    /* Channels Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filteredChannels.map((channel) => {
                            const isSelected = selectedChannel?.channelId === channel.channelId;
                            return (
                                <div
                                    key={`${channel.id}-${channel.channelId}`}
                                    onClick={() => handleSelectChannel(channel)}
                                    className={`group bg-slate-900/60 border ${isSelected ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'border-slate-800 hover:border-red-600/60'} rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between hover:-translate-y-1`}
                                >
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="bg-red-950/60 text-red-400 text-xs font-bold px-2.5 py-1 rounded-md border border-red-800/40">
                                                ID: {channel.channelId}
                                            </span>
                                            <span className="text-xs text-gray-400 font-semibold bg-slate-800 px-2 py-0.5 rounded">
                                                {channel.category || 'Live TV'}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                                            {channel.channelName}
                                        </h3>
                                        {channel.description && (
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                {channel.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            ONLINE
                                        </span>

                                        <button className="bg-red-600 group-hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            WATCH LIVE
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
