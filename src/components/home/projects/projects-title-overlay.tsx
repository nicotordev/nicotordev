
'use client';
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
      className={`${className} pointer-events-none select-none`}
    >
      <h2
        className="text-center font-stretch-ultra-expanded font-bold w-fit text-white opacity-40 drop-shadow-lg"
        style={{ fontSize: "12rem" }}
      >
        {text}
      </h2>
    </motion.div>
  );
}
