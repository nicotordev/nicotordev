"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type LogoProps = {
  width?: number;
  height?: number | `${number}` | "auto";
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  width = 120,
  height = "auto",
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  const { theme } = useTheme();

  const computedHeight = typeof height === "number" ? height : height === 'auto' ? width / 4 : Number(height);

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
