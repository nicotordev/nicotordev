import Image from "next/image";
import MexicoFlagPng from "../../../public/emojis/mexico-flag.webp";

type MexicoFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function MexicoFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "Mexico flag emoji",
}: MexicoFlagProps) {
  const ratio = MexicoFlagPng.height / MexicoFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={MexicoFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}
