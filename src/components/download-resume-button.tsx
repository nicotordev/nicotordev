'use client';

import { ArrowRight, Download, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DownloadResumeButtonProps {
  label: string 
  className?: string;
}

interface ResumeFormat {
  extension: string;
  label: string;
  icon: string;
}

const RESUME_FORMATS: ResumeFormat[] = [
  { extension: 'pdf', label: 'PDF', icon: '📄' },
  { extension: 'docx', label: 'Word', icon: '📝' },
  { extension: 'txt', label: 'Text', icon: '📃' },
  { extension: 'md', label: 'Markdown', icon: '📋' },
  { extension: 'odt', label: 'OpenDocument', icon: '📄' },
];

const RESUME_BASE_PATH = '/documents/nicolas-torres-henriquez-cv-2025';

export default function DownloadResumeButton({ label, className }: DownloadResumeButtonProps) {
  const handleDownload = (extension: string) => {
    const url = `${RESUME_BASE_PATH}.${extension}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `nicolas-torres-henriquez-cv-2025.${extension}`;
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Download className="size-4" />
          Select Format
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {RESUME_FORMATS.map((format) => (
          <DropdownMenuItem
            key={format.extension}
            onClick={() => handleDownload(format.extension)}
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
