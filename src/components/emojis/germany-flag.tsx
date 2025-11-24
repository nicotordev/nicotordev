import Image from "next/image";
import GermanyFlagPng from "../../../public/images/emojis/germany-flag.webp";

type GermanyFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function GermanyFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "Germany flag emoji",
}: GermanyFlagProps) {
  const ratio = GermanyFlagPng.height / GermanyFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={GermanyFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}
