import type { Messages } from "@/types/i18n";
import Image from "next/image";

interface SolutionSectionVideoProps {
  commonMessages: Messages["common"];
}

export default function SolutionSectionVideo({
  commonMessages,
}: SolutionSectionVideoProps) {
  const accessibility = commonMessages?.a11y ?? {};
  const media = accessibility.media ?? {};
  const altText = media.codingAlt || "Animated illustration of coding";

  return (
    <>
      <Image
        width={640}
        height={640}
        src="/animated/coding-no-bg.webp"
        alt={altText}
        loading="lazy"
        quality={45}
        unoptimized
        sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 45vw, (min-width: 640px) 86vw, 92vw"
        className="h-full w-full object-contain pointer-events-none bg-transparent drop-shadow-2xl"
      />
    </>
  );
}
