"use client";

import { assets } from "@/app/assets";
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

/** Public path under `public/` → suggested download filename and extension. */
function downloadMetaFromPublicHref(
  href: string,
): Pick<ResumeFormat, "downloadName" | "extension"> {
  const downloadName = href.slice(href.lastIndexOf("/") + 1);
  const dot = downloadName.lastIndexOf(".");
  const extension = dot >= 0 ? downloadName.slice(dot + 1) : "";
  return { downloadName, extension };
}

const RESUME_FORMAT_DEFS = [
  { key: "pdf" as const, label: "PDF", icon: "📄" },
  { key: "txt" as const, label: "Text", icon: "📃" },
  { key: "md" as const, label: "Markdown", icon: "📋" },
  { key: "html" as const, label: "HTML", icon: "🌐" },
  { key: "pngPage1" as const, label: "PNG (Page 1)", icon: "🖼️" },
  { key: "pngPage2" as const, label: "PNG (Page 2)", icon: "🖼️" },
  { key: "info" as const, label: "Metadata", icon: "ℹ️" },
] as const;

const RESUME_FORMATS: ResumeFormat[] = RESUME_FORMAT_DEFS.map((def) => {
  const href = assets.resume[def.key];
  return {
    label: def.label,
    icon: def.icon,
    href,
    ...downloadMetaFromPublicHref(href),
  };
});

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
