'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    streamUrl?: string;
    channelId?: string | number;
    title?: string;
    onClose?: () => void;
}

export default function HlsPlayer({ streamUrl, channelId, title, onClose }: HlsPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5295';

    useEffect(() => {
        let isMounted = true;

        const resolveAndPlay = async () => {
            setLoading(true);
            setError(null);
            let finalUrl = streamUrl;

            // If channelId is provided or streamUrl is not direct .m3u8, resolve via backend WebAPI
            if (channelId || (streamUrl && !streamUrl.endsWith('.m3u8'))) {
                try {
                    const target = channelId ? channelId.toString() : streamUrl;
                    const res = await fetch(`${API_URL}/api/sports/resolve?channelId=${encodeURIComponent(target!)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.success && data.streamUrl) {
                            finalUrl = data.streamUrl;
                        }
                    }
                } catch (err) {
                    console.warn('[HlsPlayer] Stream resolution fallback:', err);
                }
            }

            if (!finalUrl) {
                finalUrl = streamUrl || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
            }

            if (isMounted) {
                setResolvedUrl(finalUrl);
                setLoading(false);
            }
        };

        resolveAndPlay();

        return () => {
            isMounted = false;
        };
    }, [streamUrl, channelId, API_URL]);

    useEffect(() => {
        if (!resolvedUrl || !videoRef.current) return;

        const video = videoRef.current;

        // Clean up previous HLS instance
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90,
            });

            hlsRef.current = hls;
            hls.loadSource(resolvedUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(err => {
                    console.warn('[HlsPlayer] Autoplay prevented:', err);
                });
            });

            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error('[HlsPlayer] Fatal network error encountered, trying to recover');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error('[HlsPlayer] Fatal media error encountered, trying to recover');
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error('[HlsPlayer] Unrecoverable error');
                            hls.destroy();
                            setError('Unable to load stream playlist.');
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support for Safari / iOS
            video.src = resolvedUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch(() => { });
            });
        } else {
            setError('HLS streaming is not supported on this browser.');
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [resolvedUrl]);

    return (
        <div className="w-full bg-slate-950 border-2 border-red-600/80 rounded-2xl overflow-hidden shadow-2xl relative my-4">
            {/* Header Controls Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-red-950/40 border-b border-red-800/40">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <span className="font-bold text-white text-sm tracking-wide uppercase">
                        {title || 'AD-FREE LIVE STREAM'}
                    </span>
                    <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2 py-0.5 rounded border border-red-500/30 hidden sm:inline-block">
                        1080p HLS Direct
                    </span>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xs font-bold bg-white/10 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-all"
                    >
                        Close Player ✕
                    </button>
                )}
            </div>

            {/* Video Player Canvas */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-white gap-3">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-semibold tracking-wider text-gray-300">Resolving Ad-Free HLS Stream...</span>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 text-red-400 gap-2 p-6 text-center">
                        <span className="text-2xl">⚠️</span>
                        <span className="text-sm font-bold">{error}</span>
                        <span className="text-xs text-gray-500">Try selecting an alternative stream link or channel.</span>
                    </div>
                )}

                <video
                    ref={videoRef}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
