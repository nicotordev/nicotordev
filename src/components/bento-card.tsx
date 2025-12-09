"use client";

import { cn } from "@/lib/utils";
import type { BentoSize, PortfolioItem } from "@/types/footer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface BentoCardProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}
export default function BentoCard({ item, index, onClick }: BentoCardProps) {
  const t = useTranslations()
  const sizeClasses: Record<BentoSize, string> = {
    square: "col-span-1 row-span-1",
    wide: "col-span-1 sm:col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    large: "col-span-1 sm:col-span-2 row-span-2",
  };

  return (
    <motion.div
      layoutId={`card-${index}`} // MAGIC: Connects to modal
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 cursor-zoom-in",
        "border border-transparent dark:border-white/10",
        sizeClasses[item.size]
      )}
      // Initial entry animation for the grid only
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.05 },
      }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-medium text-white text-lg tracking-tight">
          {item.alt}
        </p>
        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mt-1">
          {t('common.viewDetails')}
        </p>
      </div>
    </motion.div>
  );
}
