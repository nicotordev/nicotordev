"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Download, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface ImageDialogProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string; // For the trigger
  imageClassName?: string; // For the image inside the dialog
}

export function ImageDialog({
  src,
  alt,
  children,
  width = 1920,
  height = 1080,
  className,
  imageClassName,
}: ImageDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = alt || "download"; // Set default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <div className="cursor-zoom-in ease-in-out hover:brightness-110 active:scale-95 transition-all">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] h-[90vh] md:h-[95vh] w-full p-0 border-none bg-transparent shadow-none overflow-hidden flex flex-col items-center justify-center outline-none"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Toolbar */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border-white/10"
              onClick={handleDownload}
              type="button"
              title="Download original"
            >
              <Download className="h-5 w-5" />
              <span className="sr-only">Download</span>
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border-white/10"
              onClick={() => setIsOpen(false)}
              type="button"
              title="Close"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={100}
            className={cn(
              "object-contain w-full h-full max-h-[90vh] md:max-h-[95vh]",
              imageClassName
            )}
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
