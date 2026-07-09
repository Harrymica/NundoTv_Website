import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
                            <Image src="/icon.png" alt="NundoTV Logo" width={36} height={36} className="rounded-md shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
                            <span>NUNDO<span className="text-brand">TV</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="#features" className="text-gray-300 hover:text-brand px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">
                                Features
                            </Link>
                            <Link href="#premium" className="text-gray-300 hover:text-brand px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">
                                Premium
                            </Link>
                            <Link href="https://github.com/Harrymica/NundoTv-Releases/releases/download/v1.0.0/NundoTv.apk" className="bg-brand text-white hover:bg-brand/80 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                                Download APK
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}
