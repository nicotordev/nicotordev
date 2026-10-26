"use client";

import GalleryImageDialog from "@/components/common/gallery-image-dialog";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SocialProofSectionProps {
  messages: Messages;
}

type SocialProofDescription = {
  intro: string;
  name: string;
  text: string;
  focus: string;
};

export default function SocialProofSection({
  messages,
}: SocialProofSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = messages.socialProof;

  const description: SocialProofDescription = {
    intro: t?.description?.intro ?? "",
    name: t?.description?.name ?? "",
    text: t?.description?.text ?? "",
    focus: t?.description?.focus ?? "",
  };

  const badgeText = t?.badge ?? "Proven experience";
  const title = t?.title ?? "Trusted by";
  const titleHighlight = t?.titleHighlight ?? "international teams";
  const titleEnd = t?.titleEnd ?? "and founders";
  const imageAlt = t?.imageAlt ?? "Nicolas working on his computer";

  const imageProps = {
    alt: imageAlt,
    src: "/images/nicolas/nico-pc.webp",
    width: 1200,
    height: 800,
    priority: true,
    sizes: "(min-width: 1024px) 50vw, 100vw",
  } as const;

  return (
    <section className="relative" id="social-proof-section">
      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-stretch justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
        {/* Desktop image */}
        <div className="hidden w-full overflow-hidden rounded-2xl border-2 border-primary shadow-lg lg:block lg:w-1/2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={imageProps.alt}
            className="group relative block w-full h-full cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              {...imageProps}
              alt={imageProps.alt}
              className="relative z-10 w-full rounded-2xl object-contain sm:h-full sm:object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 z-20 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 pointer-events-none">
              <Maximize2 className="size-3.5" />
              <span>Click to zoom</span>
            </div>
          </button>
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2">
          <div className="mx-auto lg:mr-0 lg:max-w-lg">
            {/* Badge */}
            <Typography
              as="h2"
              role="overline"
              mood="product"
              className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30"
            >
              {badgeText}
            </Typography>

            {/* Title */}
            <Typography
              as="p"
              role="display"
              mood="product"
              className={cn(
                "mt-4 text-left font-bold tracking-tight text-foreground",
                "text-3xl sm:text-5xl",
                "leading-tight"
              )}
            >
              {title} <span className="gradient-text">{titleHighlight}</span>{" "}
              {titleEnd}
            </Typography>

            {/* Mobile image */}
            <div className="my-4 block w-full overflow-hidden rounded-2xl border-2 border-primary lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={imageProps.alt}
                className="group relative block w-full cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  {...imageProps}
                  alt={imageProps.alt}
                  className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/10 pointer-events-none">
                  <Maximize2 className="size-3" />
                  <span>Zoom</span>
                </div>
              </button>
            </div>

            {/* Description */}
            <Typography
              role="body"
              className={cn(
                "mt-6 text-left text-muted-foreground",
                "text-base leading-7 sm:text-lg sm:leading-8"
              )}
            >
              {description.intro}{" "}
              <Typography as="span" className="font-bold text-foreground">
                {description.name}
              </Typography>
              {description.text}
              <br />
              <br />
              {description.focus}
            </Typography>
          </div>
        </div>
      </div>

      <GalleryImageDialog
        item={
          isOpen
            ? {
                src: imageProps.src,
                alt: imageProps.alt,
                title: `${title} ${titleHighlight} ${titleEnd}`,
                description: `${description.intro} ${description.name} ${description.text}`.trim(),
              }
            : null
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showDownload
      />
    </section>
  );
}
