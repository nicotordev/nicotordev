import Image from "next/image";

export default function SolutionSectionVideo() {
  return (
    <>
      <Image
        width={1080}
        height={1080}
        src="/animated/coding-no-bg.gif"
        alt="Animated illustration of coding"
        preload={true}
        className="h-full w-full object-contain pointer-events-none bg-transparent drop-shadow-2xl"
      />
    </>
  );
}
