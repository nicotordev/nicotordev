"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ComponentProps } from "react";

export interface BackgroundWavesAnimated
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  src?: string;
  alt?: string;
}

export default function BackgroundWavesAnimated({
  src = "/images/background/bg-waves.webp",
  alt = "Sign in background",
  fill = true,
  priority = false,
  sizes = "50vw",
  ...props
}: BackgroundWavesAnimated) {
  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: 1.2, rotate: 5 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className="object-cover"
        priority={priority}
        sizes={sizes}
        fetchPriority="high"
        {...props}
      />
    </motion.div>
  );
}
