"use client";

import type { PortfolioItem } from "@/types/footer";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react"; // Assuming you have lucide-react, or use an SVG icon
import Image from "next/image";
import { useEffect, useState } from "react";
import BentoCard from "../bento-card";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

// --- Main Component ---
export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedId]);

  const selectedItem = selectedId !== null ? items[selectedId] : null;

  return (
    <div className="w-full max-w-7xl mx-auto">
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

      {/* The Fullscreen Modal */}
      <AnimatePresence>
        {selectedId !== null && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-10 z-99999">
            {/* Backdrop (Blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${selectedId}`} // MAGIC: Connects to grid item
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden bg-neutral-900 rounded-3xl shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Container */}
              <motion.div className="relative w-full h-[60vh] sm:h-[80vh]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  width={1080}
                  height={1080}
                  className="object-contain bg-black w-full h-full" // Use contain for full view
                  priority
                />
              </motion.div>

              {/* Content Section (Only visible in modal) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-6 bg-neutral-900 border-t border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedItem.alt}
                </h2>
                <p className="text-neutral-400 text-base leading-relaxed max-w-2xl">
                  {selectedItem.description ||
                    "No description available for this Image."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
