"use client";

import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  width = 300,
  height,
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  // Maintain ~4:1 aspect ratio by default if height not provided
  const computedHeight = height ?? Math.round(width / 4);

  return (
    <span className={className} style={{ display: "inline-block", lineHeight: 0 }}>
      {/* Light theme logo (default) */}
      <Image
        src="/logo/logo-dark.svg"
        alt={alt}
        width={width}
        height={computedHeight}
        className="dark:hidden"
        {...(priority ? { priority: true } : {})}
      />
      {/* Dark theme logo */}
      <Image
        src="/logo/logo-light.svg"
        alt={alt}
        width={width}
        height={computedHeight}
        className="hidden dark:block"
        {...(priority ? { priority: true } : {})}
      />
    </span>
  );
}
