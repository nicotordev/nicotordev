import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: {
    default: "NicoTordev - Personal Site",
    template: "%s | NicoTordev"
  },
  description: "Welcome to my personal site where I share my thoughts, projects, and experiences as a developer.",
  applicationName: "NicoTordev",
  authors: [{ name: "NicoTordev", url: "https://nicotordev.com" }],
  creator: "NicoTordev",
  keywords: [
    "Personal Site",
    "Blog",
    "Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "Web Development",
    "Tech Blog",
    "Software Development"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nicotordev.com",
    title: "NicoTordev - Personal Site",
    description: "Welcome to my personal site where I share my thoughts, projects, and experiences as a developer.",
    siteName: "NicoTordev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NicoTordev - Personal Site"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoTordev - Personal Site",
    description: "Welcome to my personal site where I share my thoughts, projects, and experiences as a developer.",
    images: ["/og-image.png"],
    creator: "@nicotordev"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://nicotordev.com"
  },
  category: "Personal Site"
};

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}