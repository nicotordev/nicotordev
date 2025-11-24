"use client";

import Image from "next/image";

type LogoProps = {
  theme?: "dark" | "light";
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  theme = "dark",
  width = 300,
  height,
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  // Maintain ~4:1 aspect ratio by default if height not provided
  const computedHeight = height ?? Math.round(width / 4);

  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      {/* Dark theme logo */}
      <Image
        src={
          theme === "light"
            ? "/images/logo/logo-dark.svg"
            : "/images/logo/logo-light.svg"
        }
        alt={alt}
        width={width}
        height={computedHeight}
        {...(priority ? { priority: true } : {})}
      />
    </span>
  );
}
