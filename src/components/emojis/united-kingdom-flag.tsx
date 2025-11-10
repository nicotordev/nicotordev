import Image from "next/image";
import UnitedKingdomFlagPng from "../../../public/emojis/united-kingdom-flag.png";

type UnitedKingdomFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function UnitedKingdomFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "United Kingdom flag emoji",
}: UnitedKingdomFlagProps) {
  const ratio = UnitedKingdomFlagPng.height / UnitedKingdomFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={UnitedKingdomFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}

