"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface GalleryImageItem {
  src: string;
  alt: string;
  title?: string | undefined;
  description?: string | undefined;
}

export interface GalleryImageDialogProps<T extends GalleryImageItem = GalleryImageItem> {
  item: T | null | undefined;
  isOpen?: boolean | undefined;
  onClose: () => void;
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  layoutId?: string | undefined;
  showDownload?: boolean | undefined;
  showCounter?: boolean | undefined;
  currentIndex?: number | undefined;
  totalItems?: number | undefined;
  className?: string | undefined;
}

const emptySubscribe = () => () => {};

export function GalleryImageDialog<T extends GalleryImageItem = GalleryImageItem>({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  layoutId,
  showDownload = false,
  showCounter = false,
  currentIndex,
  totalItems,
  className,
}: GalleryImageDialogProps<T>) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const visible = isOpen !== undefined ? isOpen : item !== null;

  // Handle keyboard events: Escape for close, Arrows for navigation
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose, onPrev, onNext]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (visible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [visible]);

  const handleDownload = async () => {
    if (!item?.src) return;
    try {
      const response = await fetch(item.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = item.alt || "gallery-image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (!isClient || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {visible && item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || item.title || "Image dialog"}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 md:p-10 z-100 select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Navigation - Prev Button */}
          {onPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="hidden sm:flex absolute left-4 md:left-8 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation - Next Button */}
          {onNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="hidden sm:flex absolute right-4 md:right-8 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Modal Container */}
          <motion.div
            {...(layoutId ? { layoutId } : {})}
            className={cn(
              "relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden bg-neutral-900/95 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl cursor-default z-20",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar (Top Right) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
              {showCounter && currentIndex !== undefined && totalItems !== undefined && (
                <span className="text-xs font-medium text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  {currentIndex + 1} / {totalItems}
                </span>
              )}

              {showDownload && (
                <button
                  type="button"
                  onClick={handleDownload}
                  title="Download image"
                  aria-label="Download image"
                  className="p-2 sm:p-2.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-full backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                title="Close modal"
                aria-label="Close modal"
                className="p-2 sm:p-2.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-full backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Image Container */}
            <motion.div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] bg-black/40 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.alt}
                width={1400}
                height={1400}
                className="object-contain w-full h-full"
                priority
              />
            </motion.div>

            {/* Content / Caption Section */}
            {(item.title || item.alt || item.description) && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.1, duration: 0.25 }}
                className="p-5 sm:p-6 bg-neutral-900 border-t border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                    {item.title || item.alt}
                  </h2>

                  {/* Mobile Prev / Next Buttons */}
                  {(onPrev || onNext) && (
                    <div className="flex sm:hidden items-center gap-2 self-end">
                      {onPrev && (
                        <button
                          type="button"
                          onClick={onPrev}
                          aria-label="Previous image"
                          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      )}
                      {onNext && (
                        <button
                          type="button"
                          onClick={onNext}
                          aria-label="Next image"
                          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl mt-2">
                    {item.description}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default GalleryImageDialog;
