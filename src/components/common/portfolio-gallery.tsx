"use client";

import type { PortfolioItem } from "@/types/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import BentoCard from "../bento-card";
import GalleryImageDialog from "./gallery-image-dialog";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

// --- Main Component ---
export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem =
    selectedId !== null ? (items[selectedId] ?? null) : null;

  const handlePrev =
    selectedId !== null && selectedId > 0
      ? () => setSelectedId(selectedId - 1)
      : undefined;

  const handleNext =
    selectedId !== null && selectedId < items.length - 1
      ? () => setSelectedId(selectedId + 1)
      : undefined;

  return (
    <div className="w-full">
      {/* The Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
        {items.map((item, index) => (
          <BentoCard
            key={index}
            item={item}
            index={index}
            onClick={() => setSelectedId(index)}
          />
        ))}
      </motion.div>

      {/* The Fullscreen Modal Dialog */}
      <GalleryImageDialog
        item={selectedItem}
        onClose={() => setSelectedId(null)}
        layoutId={selectedId !== null ? `card-${selectedId}` : undefined}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={selectedId ?? undefined}
        totalItems={items.length}
        showCounter
        showDownload
      />
    </div>
  );
}

