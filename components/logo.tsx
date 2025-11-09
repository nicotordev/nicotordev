"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  width = 300,
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Maintain the ~4:1 aspect ratio of the source assets
  const height = Math.round(width / 4);

  // Avoid hydration mismatch by rendering after mount
  if (!mounted) {
    return (
      <Image
        src="/logo/logo-dark.png"
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
      />
    );
  }

  const src = resolvedTheme === "dark" ? "/logo/logo-light.png" : "/logo/logo-dark.png";

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}

