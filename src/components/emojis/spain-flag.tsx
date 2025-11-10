import Image from "next/image";
import SpainFlagPng from "../../../public/emojis/spain-flag.png";

type SpainFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function SpainFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "Spain flag emoji",
}: SpainFlagProps) {
  const ratio = SpainFlagPng.height / SpainFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={SpainFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}

