import {
  firstRow,
  fourthRow,
  secondRow,
  thirdRow,
  type Review,
} from "@/app/data/reviews";
import { getTranslations } from "next-intl/server";
import ReviewColumn from "./review-column";

export default async function ReviewList3D() {
  const t = await getTranslations("reviewsList");

  const translateReviews = (reviews: Review[]) => {
    return reviews.map((review) => ({
      ...review,
      title: t(`${review.id}.title` as any),
      feedback: review.feedback ? t(`${review.id}.feedback` as any) : null,
    }));
  };

  return (
    <div className="relative flex items-center justify-center w-full h-fit overflow-hidden rounded-3xl bg-transparent">
      <div className="flex items-center justify-between gap-6 w-full h-[1200px] px-4 sm:px-6 lg:px-8">
        <ReviewColumn reviews={translateReviews(firstRow)} />
        <ReviewColumn reviews={translateReviews(secondRow)} reverse />
        <ReviewColumn reviews={translateReviews(thirdRow)} reverse />
        <ReviewColumn reviews={translateReviews(fourthRow)} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-background via-background/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background via-background/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background via-background/60 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background via-background/60 to-transparent z-10" />
    </div>
  );
}
