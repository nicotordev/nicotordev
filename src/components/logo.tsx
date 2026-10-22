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
  width = 40,
  height = "auto",
  className,
  priority,
  alt = "NicoTorDev logo",
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  const computedHeight = typeof height === "number" ? height : height === 'auto' ? width : Number(height);

  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <Image
        src={
          currentTheme === "dark"
            ? "/images/logo/only-logo-light.svg"
            : "/images/logo/only-logo-dark.svg"
        }
        alt={alt}
        width={width}
        height={computedHeight}
        style={{ height: "auto" }}
        {...(priority ? { priority: true } : {})}
      />
    </span>
  );
}
