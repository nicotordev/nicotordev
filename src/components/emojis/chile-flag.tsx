import Image from "next/image";
import ChileFlagPng from "../../../public/emojis/chile-flag.webp";

type ChileFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function ChileFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "Chile flag emoji",
}: ChileFlagProps) {
  const ratio = ChileFlagPng.height / ChileFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={ChileFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}

