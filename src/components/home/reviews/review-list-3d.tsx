 
import { Marquee } from "@/components/ui/marquee";
import ReviewCard from "./review-card";
import { firstRow, secondRow, thirdRow, fourthRow } from "@/app/data/reviews";

export default function ReviewList3D() {
  return (
    <div className="relative flex items-center justify-center w-full h-fit overflow-hidden rounded-3xl bg-transparent">
      <div className="flex items-center justify-between gap-6 w-full h-[1200px] px-4 sm:px-6 lg:px-8">
        <Marquee pauseOnHover vertical className="[--duration:40s]">
          {firstRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]" vertical>
          {secondRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]" vertical>
          {thirdRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:40s]" vertical>
          {fourthRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background via-background/70 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background via-background/60 to-transparent z-10"></div>
    </div>
  );
}
