"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Download } from "lucide-react";

interface DownloadResumeButtonProps {
  label: React.ReactNode;
  /** Localized label for the format selector (e.g. "Select format"). Pass from server to avoid intl context. */
  selectFormatLabel?: string;
  className?: string;
}

interface ResumeFormat {
  label: string;
  icon: string;
  href: string;
  downloadName: string;
  extension: string;
}

const RESUME_FORMATS: ResumeFormat[] = [
  {
    label: "PDF",
    icon: "📄",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV.pdf",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV.pdf",
    extension: "pdf",
  },
  {
    label: "Text",
    icon: "📃",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV.txt",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV.txt",
    extension: "txt",
  },
  {
    label: "Markdown",
    icon: "📋",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV.md",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV.md",
    extension: "md",
  },
  {
    label: "HTML",
    icon: "🌐",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV.html",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV.html",
    extension: "html",
  },
  {
    label: "PNG (Page 1)",
    icon: "🖼️",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV-page-1.png",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV-page-1.png",
    extension: "png",
  },
  {
    label: "PNG (Page 2)",
    icon: "🖼️",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV-page-2.png",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV-page-2.png",
    extension: "png",
  },
  {
    label: "Metadata",
    icon: "ℹ️",
    href: "/documents/Nicolas-Torres-Henriquez-2026-CV.info.txt",
    downloadName: "Nicolas-Torres-Henriquez-2026-CV.info.txt",
    extension: "txt",
  },
];

const DEFAULT_SELECT_FORMAT_LABEL = "Select format";

export default function DownloadResumeButton({
  label,
  selectFormatLabel = DEFAULT_SELECT_FORMAT_LABEL,
  className,
}: DownloadResumeButtonProps) {

  const handleDownload = (format: ResumeFormat) => {
    const link = document.createElement("a");
    link.href = format.href;
    link.download = format.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <span className="inline-flex items-center">
            {label}
            <ArrowRight className="ml-1 size-4" aria-hidden="true" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Download className="size-4" />
          {selectFormatLabel}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {RESUME_FORMATS.map((format) => (
          <DropdownMenuItem
            key={format.downloadName}
            onClick={() => handleDownload(format)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{format.icon}</span>
              <span>{format.label}</span>
              <span className="text-muted-foreground text-xs ml-auto">
                .{format.extension}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
