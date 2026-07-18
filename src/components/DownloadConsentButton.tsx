'use client';
import React, { useState } from 'react';
import ConsentModal from './ConsentModal';
import NeonButton from './NeonButton';

interface Props {
    variant: 'navbar' | 'hero';
    apkUrl: string;
    className?: string;
}

export default function DownloadConsentButton({ variant, apkUrl, className }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleProceed = () => {
        setIsOpen(false);
        window.location.href = apkUrl;
    };

    return (
        <>
            {variant === 'hero' ? (
                <NeonButton
                    onClick={() => setIsOpen(true)}
                    className={className}
                >
                    Download Android
                </NeonButton>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`bg-brand text-white hover:bg-brand/80 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(229,9,20,0.5)] ${className || ''}`}
                >
                    Download APK
                </button>
            )}

            {isOpen && (
                <ConsentModal
                    onClose={() => setIsOpen(false)}
                    onProceed={handleProceed}
                />
            )}
        </>
    );
}
