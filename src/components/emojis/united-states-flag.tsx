import Image from "next/image";
import UnitedStatesFlagPng from "../../../public/emojis/united-states-flag.png";

type UnitedStatesFlagProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function UnitedStatesFlag({
  width = 24,
  height,
  className,
  priority,
  alt = "United States flag emoji",
}: UnitedStatesFlagProps) {
  const ratio = UnitedStatesFlagPng.height / UnitedStatesFlagPng.width;
  const computedHeight = height ?? Math.round((width ?? 24) * ratio);

  return (
    <Image
      src={UnitedStatesFlagPng}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      {...(priority ? { priority: true } : {})}
    />
  );
}

