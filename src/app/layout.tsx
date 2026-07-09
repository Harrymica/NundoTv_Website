import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NundoTV | Watch Channels, Local Media & Ad-Free Streaming App",
  description: "Download the NundoTV mobile app for the ultimate ad-free streaming experience. NundoTV is your modern streaming app to watch channels, catch live streams, and play local media with Picture-in-Picture support.",
  keywords: ["Nundo", "NundoTV", "streaming app", "watch channels", "live stream", "video player", "gaming-aesthetic", "ad-free streaming", "local media player", "Free streaming app", "watch live sports for free", "watch live tv for free", "watch movies for free", "watch tv shows for free", "watch live sports for free", "watch movies for free", "watch tv shows for free", "watch live tv for free"],
  openGraph: {
    title: "NundoTV | Watch Channels & Stream Videos",
    description: "The ultimate ad-free streaming experience with local media and Picture-in-Picture support.",
    url: "https://nundotvweb.vercel.app",
    siteName: "NundoTV",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NundoTV | Modern Streaming App",
    description: "Watch channels and stream videos ad-free with NundoTV.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
