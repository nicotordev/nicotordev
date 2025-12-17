"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useCallback, useRef, useState, type CSSProperties } from "react";

interface ZoomableImageProps extends ImageProps {
  containerClassName?: string;
  scale?: number;
}

export default function ZoomableImage({
  className,
  containerClassName,
  style,
  scale = 1.5,
  ...props
}: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingOriginRef = useRef<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // CWV/INP: avoid React re-renders on every mousemove; batch DOM updates per frame.
    pendingOriginRef.current = `${x}% ${y}%`;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const origin = pendingOriginRef.current;
      if (!origin || !containerRef.current) return;
      containerRef.current.style.setProperty("--zoom-origin", origin);
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    pendingOriginRef.current = "center center";
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!containerRef.current) return;
      containerRef.current.style.setProperty("--zoom-origin", "center center");
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden cursor-zoom-in", containerClassName)}
      style={
        {
          "--zoom-origin": "center center",
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        className={cn("transition-transform duration-200 ease-out", className)}
        style={{
          ...style,
          transformOrigin: "var(--zoom-origin)",
          transform: isHovered ? `scale(${scale})` : style?.transform,
        }}
        {...props}
        alt={props.alt || ""}
      />
    </div>
  );
}
