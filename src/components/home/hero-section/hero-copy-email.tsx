"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface HeroCopyEmailProps {
  email: string;
  copiedMessage?: string;
  copyLabel?: string;
  errorMessage?: string;
}

export default function HeroCopyEmail({
  email,
  copiedMessage,
  copyLabel,
  errorMessage,
}: HeroCopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (copiedMessage) {
        toast.success(copiedMessage);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  const label = copyLabel ? `${copyLabel} ${email}` : email;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-medium text-muted-foreground shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-secondary hover:bg-card hover:text-foreground hover:shadow-sm active:scale-[0.98] cursor-pointer"
      title={label}
      aria-label={label}
    >
      <span className="flex size-4 items-center justify-center text-secondary transition-colors">
        {copied ? (
          <Check className="size-4 text-success animate-in zoom-in-75 duration-150" />
        ) : (
          <Copy className="size-4 group-hover:scale-110 transition-transform" />
        )}
      </span>
      <span className="font-mono text-xs sm:text-sm tracking-tight text-foreground">
        {email}
      </span>
    </button>
  );
}
