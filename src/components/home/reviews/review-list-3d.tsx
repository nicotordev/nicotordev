import {
  firstRow,
  fourthRow,
  secondRow,
  thirdRow,
  type Review,
} from "@/app/data/reviews";
import { getTranslations } from "next-intl/server";
import ReviewColumn from "./review-column";
import { ReviewDialogProvider } from "./review-dialog-provider";

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
    <div className="relative flex items-center justify-center w-full h-fit overflow-y-clip rounded-2xl bg-transparent">
      <ReviewDialogProvider>
        <div className="relative flex items-center justify-between gap-6 w-full h-[1800px] px-4 sm:px-6 lg:px-8 bg-transparent z-10">
          <ReviewColumn reviews={translateReviews(firstRow)} />
          <ReviewColumn reviews={translateReviews(secondRow)} reverse />
          <ReviewColumn reviews={translateReviews(thirdRow)} reverse />
          <ReviewColumn reviews={translateReviews(fourthRow)} />
        </div>
      </ReviewDialogProvider>
    </div>
  );
}
