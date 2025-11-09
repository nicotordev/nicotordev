"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
  height?: number;
};

export default function Logo({
  width = 300,
  height = 75,
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const src =
    resolvedTheme === "dark" ? "/logo/logo-light.png" : "/logo/logo-dark.png";

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      {...(className ? { className } : {})}
      {...(priority ? { priority: true } : {})}
    />
  );
}
