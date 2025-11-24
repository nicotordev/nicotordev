import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NoisyBackgroundProps {
  className?: string;
}

export default function NoisyBackground({ className }: NoisyBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute top-0 left-0 w-full h-full z-0 overflow-hidden",
        className
      )}
    >
      <Image
        src="/images/background/texture-1.webp"
        alt="Noisy Background"
        width={1920}
        height={1080}
        className={cn("object-cover w-full h-full opacity-50", className)}
        priority
      />
    </div>
  );
}
