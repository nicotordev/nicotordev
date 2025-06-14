
import Motion from '@/components/Motion';
import { assets } from '@/app/assets';
import { Metadata } from 'next';
import Image from 'next/image';
import WaveBackground from '@/components/WaveBackground';
import { Button } from 'flowbite-react';

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


const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/nicotordev",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nicotordev",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:nicotordev@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
      </svg>
    ),
  },
]

const backgroundBlobs = [
  {
    id: 1,
    className: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    color: "bg-gradient-to-br from-pink-400 to-purple-600",
    size: "w-96 h-96",
  },
  {
    id: 2,
    className: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    color: "bg-gradient-to-br from-blue-400 to-cyan-600",
    size: "w-80 h-80",
  },
  {
    id: 3,
    className: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    color: "bg-gradient-to-br from-purple-400 to-pink-600",
    size: "w-72 h-72",
  },
  {
    id: 4,
    className: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    color: "bg-gradient-to-br from-cyan-400 to-blue-600",
    size: "w-88 h-88",
  },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Wave Background */}
      <WaveBackground />

      {/* Enhanced Background with mesh gradient */}
      <div className="absolute inset-0 bg-mesh" />

      {/* Animated Background Blobs */}
      <div className="blob blob-primary blob-large -top-48 -left-48" />
      <div className="blob blob-secondary -top-32 -right-32" />
      <div className="blob blob-accent -bottom-32 -left-32" />
      <div className="blob blob-primary blob-small -bottom-48 -right-48" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Profile Image with enhanced effects */}
          <Motion
            className="relative animate-float"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse wave-pulse" />
              <div className="relative w-full h-full glass rounded-full p-2 shadow-2xl">
                <Image
                  src={assets.logo}
                  alt="Nicolas Torres - Full Stack Developer"
                  width={150}
                  height={150}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </Motion>

          {/* Main Content */}
          <div className="space-y-6 max-w-4xl">
            {/* Main Heading with gradient text */}
            <Motion
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Hello, I'm <span className="gradient-text animate-shimmer">Nicolas Torres</span>
              </h1>
            </Motion>

            {/* Subtitle with enhanced styling */}
            <Motion
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                I'm a passionate <span className="font-semibold gradient-text-secondary">Full Stack Developer</span>{" "}
                with expertise in building modern web applications that deliver exceptional user experiences.
              </p>
            </Motion>

            {/* CTA Buttons with glass effect */}
            <Motion
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Motion
                motionElement="div"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button color="pink">About Me</Button>
              </Motion>

              <Motion
                motionElement="div"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button color="purple">Download Resume</Button>
              </Motion>
            </Motion>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <Motion
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="scroll-indicator glass rounded-full p-2">
          <Motion
            motionElement="div"
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Motion
              motionElement="div"
              className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </Motion>
        </div>
      </Motion>
    </section>
  )
}