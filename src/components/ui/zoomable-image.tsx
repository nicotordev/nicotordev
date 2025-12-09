"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useCallback, useRef, useState } from "react";

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
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setTransformOrigin(`${x}% ${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransformOrigin("center center");
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden cursor-zoom-in", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        className={cn("transition-transform duration-200 ease-out", className)}
        style={{
          ...style,
          transformOrigin,
          transform: isHovered ? `scale(${scale})` : style?.transform,
        }}
        {...props}
        alt={props.alt || ""}
      />
    </div>
  );
}
