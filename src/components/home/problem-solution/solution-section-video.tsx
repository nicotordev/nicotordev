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
        width={1080}
        height={1080}
        src="/animated/coding-no-bg.webp"
        alt={altText}
        priority
        className="h-full w-full object-contain pointer-events-none bg-transparent drop-shadow-2xl"
      />
    </>
  );
}
