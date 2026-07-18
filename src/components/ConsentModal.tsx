'use client';
import React, { useState } from 'react';

interface ConsentModalProps {
    onClose: () => void;
    onProceed: () => void;
}

export default function ConsentModal({ onClose, onProceed }: ConsentModalProps) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#111] border border-white/20 rounded-2xl max-w-lg w-full p-8 shadow-[0_0_50px_rgba(229,9,20,0.2)]">
                <h2 className="text-2xl font-black uppercase text-brand mb-4 tracking-wider">Before you download</h2>
                <p className="text-gray-300 mb-4 font-semibold text-sm leading-relaxed">
                    NundoTV uses the <span className="text-white">Bright Data SDK</span> to provide you with a premium, absolutely <strong>ad-free</strong> streaming experience.
                </p>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    By agreeing to download and install this application, you consent to securely sharing your device's idle resources (such as bandwidth) with the Bright Data network. This unique approach allows us to keep the app completely free and removes the need for intrusive video ads that ruin your viewing experience. You can opt-out by uninstalling the app at any time.
                </p>

                <div className="flex items-start gap-4 mb-8 bg-black/40 p-4 rounded-lg border border-white/5">
                    <input
                        type="checkbox"
                        id="consent-checkbox"
                        className="mt-1 w-5 h-5 accent-brand cursor-pointer"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="consent-checkbox" className="text-sm font-bold text-gray-200 cursor-pointer select-none leading-relaxed">
                        I understand and consent to the use of my device's idle resources via Bright SDK in exchange for an ad-free experience.
                    </label>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onProceed}
                        disabled={!agreed}
                        className={`px-6 py-2 rounded-md font-bold uppercase tracking-wider transition-all ${agreed ? 'bg-brand text-white hover:bg-brand/80 shadow-[0_0_15px_rgba(229,9,20,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none'}`}
                    >
                        Download APK
                    </button>
                </div>
            </div>
        </div>
    );
}
