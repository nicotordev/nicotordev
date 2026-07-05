"use client";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";

export interface ProjectsTitleOverlayProps {
  className: string;
  text: string;
}

export default function ProjectsTitleOverlay({
  className,
  text,
}: ProjectsTitleOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={`${className} pointer-events-none select-none w-full flex items-center justify-center py-4 sm:py-6`}
    >
      <Typography
        as="h2"
        role="display"
        className="
          text-center
          font-stretch-ultra-expanded
          font-bold
          text-white
          opacity-60
          drop-shadow-lg
          leading-none
          text-[2.25rem]      /* ~36px (mobile base, lg:3xl) */
          xs:text-[2.75rem]   /* ~44px for slightly larger screens */
          sm:text-[4rem]      /* tablet */
          md:text-[5rem]
          lg:text-[6rem]
          xl:text-[8rem]
          break-words
        "
        style={{
          wordBreak: "break-word",
          hyphens: "auto",
        }}
      >
        {text}
      </Typography>
    </motion.div>
  );
}
