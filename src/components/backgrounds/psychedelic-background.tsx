"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMessages } from "next-intl";

export default function PsychedelicBackground() {
  const messages = useMessages();
  const media = (messages as any)?.common?.a11y?.media ?? {};
  const altText =
    media.psychedelicTextureAlt || "Psychedelic texture background";

  return (
    <motion.div className="absolute inset-0 w-full h-full z-0">
      <Image
        src="/images/background/pscyehdelic-texture.webp"
        alt={altText}
        fill
        priority
        className="object-cover w-full h-full opacity-70 blur-sm border-t border-b border-primary/50"
      />
    </motion.div>
  );
}
