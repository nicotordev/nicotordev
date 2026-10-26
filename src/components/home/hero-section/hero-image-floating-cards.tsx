"use client";

import type { Messages } from "@/types/i18n";
import { motion, type Transition } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface HeroImageFloatingCardsProps {
  stats: Messages["hero"]["stats"];
  availableForHire: string;
  name: string;
}

const floatTransition = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
});

export default function HeroImageFloatingCards({
  stats,
  availableForHire,
  name,
}: HeroImageFloatingCardsProps) {
  return (
    <div className="relative flex justify-center items-center w-full max-w-85 sm:max-w-100 lg:max-w-115">
      {/* Psychedelic Ambient Glow with Breathing Motion */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.65, 0.85, 0.65],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 sm:-inset-6 bg-linear-to-tr from-primary/30 via-secondary/25 to-accent/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial from-secondary/35 via-transparent to-transparent blur-2xl -z-10 pointer-events-none"
      />

      {/* Floating Stat 1: Top Rated & Job Success */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [-8, 6, -8],
          rotate: [-1.2, 1, -1.2],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.2 },
          scale: { duration: 0.6, delay: 0.2 },
          y: floatTransition(5.8),
          rotate: floatTransition(5.8),
        }}
        whileHover={{
          scale: 1.06,
          y: -4,
          transition: { type: "spring", stiffness: 350, damping: 20 },
        }}
        className="absolute -left-3 sm:-left-6 lg:-left-12 top-6 sm:top-8 z-20 hidden sm:block max-w-48 sm:max-w-56 rounded-2xl border border-border/80 bg-card/90 p-3 sm:p-3.5 shadow-xl backdrop-blur-md cursor-default select-none"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {stats.job_success_rate}
          </span>
          <span className="inline-flex items-center rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-success uppercase tracking-wider">
            {stats.top_rated}
          </span>
        </div>
        <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground font-medium leading-snug">
          {stats.job_success}
        </p>
      </motion.div>

      {/* Floating Stat 2: Years Experience & Scalable Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [6, -8, 6],
          rotate: [1, -1.5, 1],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.35 },
          scale: { duration: 0.6, delay: 0.35 },
          y: floatTransition(6.6, 0.5),
          rotate: floatTransition(6.6, 0.5),
        }}
        whileHover={{
          scale: 1.06,
          y: -4,
          transition: { type: "spring", stiffness: 350, damping: 20 },
        }}
        className="absolute -left-3 sm:-left-6 lg:-left-10 bottom-6 sm:bottom-10 z-20 hidden sm:block max-w-48 sm:max-w-56 rounded-2xl border border-border/80 bg-card/90 p-3 sm:p-3.5 shadow-xl backdrop-blur-md cursor-default select-none"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {stats.years_experience}
          </span>
          <Sparkles className="size-4 text-primary fill-primary/20" />
        </div>
        <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground font-medium leading-snug">
          {stats.years_description}
        </p>
      </motion.div>

      {/* Floating Stat 3: 5.0 Rating & Global Founders */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [-7, 7, -7],
          rotate: [-1, 1.2, -1],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          scale: { duration: 0.6, delay: 0.5 },
          y: floatTransition(6.2, 0.8),
          rotate: floatTransition(6.2, 0.8),
        }}
        whileHover={{
          scale: 1.06,
          y: -4,
          transition: { type: "spring", stiffness: 350, damping: 20 },
        }}
        className="absolute -right-3 sm:-right-6 lg:-right-10 bottom-10 sm:bottom-14 z-20 hidden sm:block max-w-48 sm:max-w-60 rounded-2xl border border-border/80 bg-card/90 p-3 sm:p-3.5 shadow-xl backdrop-blur-md cursor-default select-none"
      >
        <div
          className="flex items-center gap-1.5"
          aria-label={`${stats.rating} - ${stats.rating_stars_aria}`}
        >
          <span className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {stats.rating}
          </span>
          <span
            className="text-warning text-xs sm:text-sm tracking-widest select-none"
            aria-hidden="true"
          >
            ★★★★★
          </span>
        </div>
        <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground font-medium leading-snug">
          {stats.rating_description}
        </p>
      </motion.div>

      {/* Nicolas Hero Image Container with Subtle Breathing Scale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full aspect-794/1034 drop-shadow-2xl"
      >
        <Image
          src="/images/nicolas/nico-hero.webp"
          alt={name}
          width={794}
          height={1034}
          priority
          quality={90}
          className="h-auto w-full object-contain select-none transition-transform duration-500 hover:scale-[1.02]"
          sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 320px"
        />

        {/* Floating Availability Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [4, -5, 4],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 },
            scale: { duration: 0.5, delay: 0.3 },
            y: floatTransition(5.2, 0.3),
          }}
          whileHover={{
            scale: 1.07,
            transition: { type: "spring", stiffness: 350, damping: 20 },
          }}
          className="absolute -right-2 sm:-right-4 lg:-right-8 top-4 sm:top-6 z-20 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground shadow-lg backdrop-blur-md cursor-default select-none"
        >
          <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-full rounded-full bg-success ring-2 ring-success/25" />
          </span>
          {availableForHire}
        </motion.div>
      </motion.div>
    </div>
  );
}
