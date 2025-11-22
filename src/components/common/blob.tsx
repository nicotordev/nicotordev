"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface BlobProps {
  className?: string;
  variant?: "pink" | "blue" | "green" | "purple";
  style?: React.CSSProperties;
}

export function Blob({ className, variant = "pink", style }: BlobProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute pointer-events-none animate-morph opacity-60 blur-3xl",
        className
      )}
      style={{
        width: "400px",
        height: "400px",
        background: `linear-gradient(120deg, var(--${
          variant === "pink"
            ? "accent"
            : variant === "blue"
            ? "chart-2"
            : variant === "green"
            ? "chart-4"
            : "secondary"
        }), var(--${
          variant === "pink"
            ? "primary"
            : variant === "blue"
            ? "chart-1"
            : variant === "green"
            ? "chart-5"
            : "accent"
        }))`,
        ...style,
      }}
    />
  );
}

export function PinkBlob(props: BlobProps) {
  return <Blob {...props} variant="pink" />;
}
