'use client';
import React, { useEffect, useState } from 'react';

export default function WebsiteAdBanner() {
    const [isLoaded, setIsLoaded] = useState(false);
    const rawClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const clientId = rawClientId
        ? (rawClientId.startsWith('pub-') ? `ca-${rawClientId}` : rawClientId)
        : undefined;
    const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

    useEffect(() => {
        if (!clientId || !slotId) return;

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsLoaded(true);
        } catch (e) {
            console.error('[WebsiteAdBanner] Failed to initialize ad slot:', e);
        }
    }, [clientId, slotId]);

    // If environment variables are not configured (e.g. local DEV or Vercel config pending)
    if (!clientId || !slotId) {
        return (
            <div className="w-full max-w-5xl mx-auto my-12 px-4">
                <div className="w-full flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2 font-semibold">
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                        Simulated Advertisement
                    </span>
                    <span className="normal-case text-zinc-600">Local Development Ad Preview</span>
                </div>

                {/* Ad Container */}
                <div className="w-full relative bg-zinc-950/80 border border-brand/20 rounded-xl p-4 md:py-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-[0_0_30px_rgba(229,9,20,0.05),inset_0_0_20px_rgba(0,0,0,0.6)] group hover:border-brand/40 transition-colors">
                    {/* Background glow shadow effect */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Google Ad tags (Top Right Info & Close buttons style) */}
                    <div className="absolute top-2 right-3 flex items-center gap-1.5 text-zinc-600 hover:text-zinc-400 pointer-events-none select-none">
                        <span className="text-[9px] font-sans tracking-wide">Ads by Google (Simulated)</span>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </div>

                    {/* Campaign Text / Icon */}
                    <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                        {/* App Icon Glow */}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand to-[#600] flex-shrink-0 flex items-center justify-center border border-brand/40 shadow-[0_0_15px_rgba(229,9,20,0.3)] group-hover:scale-105 transition-transform">
                            <span className="font-black text-2xl md:text-3xl text-white tracking-tighter">N<span className="text-black">T</span></span>
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-brand/10 border border-brand/35 text-[9px] font-black text-brand uppercase tracking-wider">
                                    SPONSORED CAMPAIGN
                                </span>
                                <h4 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wide">
                                    Get the NundoTV App
                                </h4>
                            </div>
                            <p className="text-xs text-zinc-400 max-w-xl font-medium leading-relaxed">
                                Stream your favorite live channels and videos 100% ad-free! Download the official Android companion app with floating Picture-in-Picture mode support today.
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="z-10 flex-shrink-0 w-full md:w-auto self-stretch md:self-center flex items-center">
                        <a
                            href="https://github.com/Harrymica/NundoTv-Releases/releases/download/v1.0.0/default.NundoTv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand hover:bg-[#ff1f2c] text-white text-xs font-black uppercase tracking-wider border-slanted transition-all shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
                        >
                            Download APK
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto my-12 px-4 flex flex-col items-center">
            <span className="text-[10px] font-black text-brand/60 uppercase tracking-[0.25em] mb-3">
                Advertisement
            </span>
            <div className="w-full max-w-4xl min-h-[90px] md:min-h-[120px] bg-transparent flex justify-center items-center overflow-hidden">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%' }}
                    data-ad-client={clientId}
                    data-ad-slot={slotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
