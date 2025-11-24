import Image from "next/image";
import { getMessages } from "next-intl/server";

export default async function SolutionSectionVideo() {
  const messages = await getMessages();
  const accessibility = (messages.common as any)?.a11y ?? {};
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
