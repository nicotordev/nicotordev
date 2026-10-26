"use client";

import GalleryImageDialog from "@/components/common/gallery-image-dialog";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

export interface WorkspacePhotoProps {
  src: string;
  alt: string;
  title?: string | undefined;
  description?: string | undefined;
  className?: string | undefined;
  aspectRatioClassName?: string | undefined;
  imageClassName?: string | undefined;
}

export function WorkspacePhoto({
  src,
  alt,
  title,
  description,
  className,
  aspectRatioClassName = "aspect-16/7",
  imageClassName,
}: WorkspacePhotoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("common");
  const zoomLabel = t("viewDetails") || "Click to zoom";

  return (
    <>
      <div
        className={cn(
          "w-full overflow-hidden rounded-2xl border-2 border-primary shadow-lg",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={alt}
          className="group relative block w-full h-full cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div
            className={cn(
              "relative w-full h-full overflow-hidden rounded-2xl",
              aspectRatioClassName
            )}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className={cn(
                "relative z-10 w-full rounded-2xl object-cover group-hover:scale-103 transition-transform duration-700 ease-out",
                imageClassName
              )}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 z-20 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Floating indicator */}
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 pointer-events-none">
              <Maximize2 className="size-3.5" />
              <span>{zoomLabel}</span>
            </div>
          </div>
        </button>
      </div>

      <GalleryImageDialog
        item={isOpen ? { src, alt, title: title ?? alt, description } : null}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showDownload
      />
    </>
  );
}

export default WorkspacePhoto;
