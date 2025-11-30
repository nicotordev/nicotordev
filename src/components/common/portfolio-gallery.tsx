"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // Assuming you have lucide-react, or use an SVG icon

// --- Types ---
export type BentoSize = "square" | "wide" | "tall" | "large";

interface PortfolioItem {
  src: string;
  alt: string;
  size: BentoSize;
  description?: string; // Added optional description for the showcase view
}

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
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-10 z-[99999]">
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

// --- Individual Grid Card ---
function BentoCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-medium text-white text-lg tracking-tight">
          {item.alt}
        </p>
        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mt-1">
          View Details
        </p>
      </div>
    </motion.div>
  );
}
