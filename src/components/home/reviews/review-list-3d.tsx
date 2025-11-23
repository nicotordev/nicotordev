 
import { Marquee } from "@/components/ui/marquee";
import ReviewCard from "./review-card";
import { firstRow, secondRow, thirdRow, fourthRow } from "@/app/data/reviews";

export default function ReviewList3D() {
  return (
    <div className="flex items-center justify-center w-full h-fit overflow-hidden rounded-full">
      <div className="flex items-center justify-between gap-4 w-fit mx-auto h-[1200px]">
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

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b z-10"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t z-10"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r z-10"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l z-10"></div>
    </div>
  );
}
