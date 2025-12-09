import Image from "next/image";
import ProjectsTitleOverlay from "./projects-title-overlay";

const ProjectsCarouselSkeleton = () => {
  return (
    <div className="relative w-full h-full min-h-[800px] overflow-hidden">
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt="Animated texture"
        className="h-full w-full object-cover z-1 absolute inset-0 mix-blend-multiply opacity-30"
      />
      {/* Placeholder blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-accent blur-[20px] rounded-full z-1 opacity-60" />
      <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] bg-accent blur-[20px] rounded-full z-1 opacity-70" />
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-secondary blur-[20px] rounded-full z-1 opacity-70" />

      <ProjectsTitleOverlay
        className="absolute top-0 z-10"
        text={"Projects I've Built"}
      />
      <ProjectsTitleOverlay
        className="absolute bottom-0 right-0 rotate-180 z-10"
        text={"Projects I've Built"}
      />

      {/* Loading Indicator */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-white/20 border-t-accent rounded-full animate-spin" />
          <p className="text-white/60 font-medium animate-pulse">
            Loading Projects...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarouselSkeleton;
