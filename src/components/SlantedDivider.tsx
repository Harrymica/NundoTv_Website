import React from 'react';

interface SlantedDividerProps {
    direction?: 'left' | 'right';
    className?: string;
    color?: string; // e.g. 'bg-brand' or 'bg-bg-panel'
}

export default function SlantedDivider({ direction = 'right', className = '', color = 'bg-brand' }: SlantedDividerProps) {
    const polygon = direction === 'right'
        ? 'polygon(0 0, 100% 100%, 0 100%)'
        : 'polygon(100% 0, 100% 100%, 0 100%)';

    return (
        <div
            className={`w-full h-16 md:h-24 ${color} ${className}`}
            style={{ clipPath: polygon, marginTop: '-1px' }} // -1px prevents visual gaps
        />
    );
}
