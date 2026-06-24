import React from 'react';
import Link from 'next/link';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    children: React.ReactNode;
    className?: string;
}

export default function NeonButton({ href, children, className = '', ...props }: NeonButtonProps) {
    const baseClasses = `
    inline-flex items-center justify-center 
    px-8 py-4 
    bg-black border border-brand 
    text-white text-lg font-bold uppercase tracking-wider
    neon-box
    transition-all duration-300 ease-in-out
    hover:bg-brand hover:text-white hover:border-transparent
    hover:shadow-[0_0_20px_rgba(229,9,20,0.8),inset_0_0_10px_rgba(229,9,20,0.4)]
    focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-black
    border-slanted
    ${className}
  `;

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={baseClasses} {...props}>
            {children}
        </button>
    );
}
