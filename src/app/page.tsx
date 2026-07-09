import Navbar from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';
import SlantedDivider from '@/components/SlantedDivider';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand selection:text-white">
      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full h-[95vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/AbstractBg.png" alt="Abstract Pattern" fill className="object-cover opacity-40 mix-blend-screen" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-[#3a0205]/40 opacity-80 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand rounded-full blur-[120px] opacity-20 z-0"></div>

        <div className="z-10 flex flex-col items-center text-center px-4 mt-20">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-brand text-glow mb-6 mt-4">
            THE STREAMING APP
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            NundoTV is the uncompromising mobile app built for pure entertainment. Dark themed. Ad-Free options. Picture-in-Picture.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <NeonButton href="https://github.com/Harrymica/NundoTv_app/releases/download/v1.0.0/NundoTv.apk" className="text-xl px-10 py-5 border-[3px] shadow-[0_0_30px_rgba(229,9,20,0.5)]">
              Download Android
            </NeonButton>
            <button className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-700 text-gray-500 text-lg font-bold uppercase tracking-wider border-slanted cursor-not-allowed bg-black/40" title="Coming soon!">
              iOS (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      <SlantedDivider color="bg-bg-panel" direction="right" />

      {/* ─── APP SHOWCASE SECTION (MOCKUPS) ─── */}
      <section className="relative bg-bg-panel py-32 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-glow">
              Explore The Interface
            </h2>
            <p className="text-gray-400 font-bold text-xl">Sleek, pitch-black UI designed to reduce eye strain.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-center items-center mt-8">
            {/* Mockup 1 */}
            <div className="w-full md:w-[300px] h-[600px] bg-black border-2 border-brand/50 rounded-[2.5rem] relative p-1.5 shadow-[0_0_40px_rgba(229,9,20,0.2)] overflow-hidden group hover:border-brand/80 transition-colors">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image src="/images/homepage.jpg" alt="Home Screen" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]"></div>
              </div>
            </div>

            {/* Mockup 2 (Slightly elevated) */}
            <div className="w-full md:w-[320px] h-[640px] bg-black border-4 border-brand rounded-[2.5rem] relative p-1.5 shadow-[0_0_60px_rgba(229,9,20,0.4)] md:-translate-y-8 z-10 overflow-hidden">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image src="/HeroImag.png" alt="Hero Mockup Dashboard" fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2rem]"></div>
              </div>
            </div>

            {/* Mockup 3 */}
            <div className="w-full md:w-[300px] h-[600px] bg-black border-2 border-brand/50 rounded-[2.5rem] relative p-1.5 shadow-[0_0_40px_rgba(229,9,20,0.2)] overflow-hidden group hover:border-brand/80 transition-colors">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image src="/images/homepage1.jpg" alt="The Library Mockup" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SlantedDivider color="bg-black" direction="left" />

      {/* ─── OPERA GX STYLE SPOTLIGHT SECTIONS ─── */}
      <section id="features" className="w-full bg-black py-24 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col gap-32">

          {/* SECTION 1: Blockbuster Movies (Left Text, Right Image) */}
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            <div className="w-full md:w-5/12 z-10 pl-4 md:pl-12 border-l border-brand/50 relative">
              <div className="absolute top-0 left-0 w-px h-1/2 bg-gradient-to-b from-brand to-transparent -translate-x-[1px]"></div>
              <div className="flex items-center gap-3 mb-6">
                <Image src="/icon.png" alt="NundoTV" width={28} height={28} className="rounded" />
                <span className="text-xl text-brand font-light tracking-widest">CINEMA</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-6 leading-tight">
                BLOCKBUSTER <br /> MOVIES
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-semibold">
                Immerse yourself in cinematic masterpieces with our premium offline fallback and ultra-HD streaming.
              </p>
            </div>
            <div className="w-full md:w-7/12">
              <div className="w-full aspect-[16/9] bg-[#0a0a0a] rounded-xl border border-white/10 relative overflow-hidden shadow-[0_0_80px_rgba(229,9,20,0.1)] group">
                <Image src="/images/Movies.jpg" alt="Blockbuster Movies" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Anime (Right Text, Left Image / Massive Top Text) */}
          <div className="flex flex-col items-start gap-8 relative mt-12 w-full">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-16 w-px bg-gradient-to-b from-white/50 to-transparent flex justify-center mt-8 relative">
                <div className="absolute -bottom-2 w-2 h-2 border-r border-b border-white/50 rotate-45"></div>
              </div>
              <span className="text-lg text-gray-500 font-bold uppercase tracking-widest ml-4 -mt-12">SIMULCAST</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider mb-6 w-full text-left md:w-1/2 text-glow text-brand">
              UNLIMITED <br /> ANIME
            </h2>
            <p className="text-gray-400 text-lg mb-4 max-w-xl font-semibold">
              Simulcast tracking, specialized dark-themed subs, and zero ads interrupting your favorite arcs.
            </p>

            <div className="w-full aspect-video bg-[#0a0a0a] rounded-3xl mt-4 relative border border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <Image src="/images/anime.jpg" alt="Unlimited Anime" fill sizes="100vw" className="object-cover" />
            </div>
          </div>

          {/* SECTION 3: Live Sports (Framed UI) */}
          <div className="relative border border-brand/40 rounded-[2rem] p-8 md:p-16 mt-16 overflow-hidden flex flex-col md:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent z-0"></div>

            <div className="w-full md:w-5/12 z-10">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-6">
                LIVE <br /> SPORTS
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-semibold">
                Experience split-second low latency casting. Picture-in-Picture mode ensures you never miss a play.
              </p>
            </div>

            <div className="w-full md:w-7/12 relative z-10">
              <div className="w-full aspect-[16/9] bg-[#111] rounded-2xl relative shadow-2xl border border-white/10 overflow-hidden transform md:translate-x-12">
                <Image src="/images/sporttv.jpg" alt="Live Sports" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
              </div>
            </div>
          </div>

          {/* SECTION 6: Comedy & Classics (Framed UI reversed) */}
          <div className="relative border border-white/10 rounded-[2rem] p-8 md:p-16 mt-16 overflow-hidden flex flex-col md:flex-row-reverse items-center gap-16 bg-gradient-to-tr from-black to-[#1a1a1a]">

            <div className="w-full md:w-5/12 z-10 text-right">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-6 text-brand">
                COMEDY & <br /> CLASSICS
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-semibold">
                The ultimate nostalgic collection. Scroll through hundreds of hours of timeless classics and stand-up without a single buffering micro-stutter.
              </p>
            </div>

            <div className="w-full md:w-7/12 relative z-10">
              <div className="w-full aspect-[16/9] bg-[#111] rounded-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-brand/30 overflow-hidden transform md:-translate-x-12">
                <Image src="/images/Mr. bean.jpg" alt="Comedy & Classics" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
              </div>
            </div>
          </div>

          {/* SECTION 4: Global News (Left Text, Right Image) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative mt-16">
            <div className="w-full md:w-5/12 z-10 pr-4 md:pr-12 border-r border-gray-600 relative text-right">
              <div className="absolute top-0 right-0 w-px h-1/2 bg-gradient-to-b from-white to-transparent translate-x-[1px]"></div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-6 leading-tight text-white">
                GLOBAL <br /> NEWS
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-semibold ml-auto max-w-sm">
                Stay updated seamlessly. Floating player capability lets you monitor live feeds while browsing other tabs in NundoTV.
              </p>
            </div>
            <div className="w-full md:w-7/12">
              <div className="w-full aspect-[16/9] bg-[#0a0a0a] rounded-xl border border-white/10 relative overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.05)] group">
                <Image src="/images/news.jpg" alt="Global News" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* SECTION 5: Premium Entertainment (Massive Header) */}
          <div className="flex flex-col items-end gap-8 relative mt-12 w-full text-right">
            <div className="flex items-center justify-end gap-2 mb-8 w-full mr-12">
              <span className="text-lg text-gray-500 font-bold uppercase tracking-widest mr-4">ORIGINALS</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider mb-6 w-full text-right md:w-3/4 text-glow">
              PREMIUM <br /> ENTERTAINMENT
            </h2>
            <p className="text-gray-400 text-lg mb-4 max-w-xl font-semibold mr-2 md:mr-12">
              Endless binge-watching carefully curated for you without the bloat of traditional premium apps.
            </p>

            <div className="w-full aspect-[21/9] bg-[#0a0a0a] rounded-3xl mt-4 relative border border-brand/20 shadow-[0_20px_60px_rgba(229,9,20,0.15)] overflow-hidden">
              <Image src="/images/entertainment.jpg" alt="Premium Entertainment" fill sizes="100vw" className="object-cover" />
            </div>
          </div>



        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black py-16 px-4 border-t-4 border-brand border-slanted relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-black tracking-tighter text-white">NUNDO<span className="text-brand">TV</span></h2>
            <p className="text-gray-600 font-bold mt-2">© {new Date().getFullYear()} NundoTV. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-brand font-bold transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-brand font-bold transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-brand font-bold transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
