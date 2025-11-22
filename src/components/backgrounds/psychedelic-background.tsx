"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PsychedelicBackground() {
  return (
    <motion.div className="absolute inset-0 w-full h-full z-0">
      <Image
        src="/images/background/pscyehdelic-texture.webp"
        alt="Psychedelic texture background"
        fill
        priority
        className="object-cover w-full h-full opacity-70 blur-sm border-t border-b border-primary/50"
      />
    </motion.div>
  );
}
