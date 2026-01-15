import {
  firstRow,
  fourthRow,
  secondRow,
  thirdRow,
  type Review,
  type ReviewIdWithFeedback,
} from "@/app/data/reviews";
import { getTranslations } from "next-intl/server";
import ReviewColumn from "./review-column";
import { ReviewDialogProvider } from "./review-dialog-provider";

type ReviewId = Review["id"];
type ReviewTitleKey = `${ReviewId}.title`;
type ReviewFeedbackKey = `${ReviewIdWithFeedback}.feedback`;
type ReviewI18nKey = ReviewTitleKey | ReviewFeedbackKey;

function translateReviews<T extends Review>(
  t: (key: ReviewI18nKey) => string,
  reviews: readonly T[]
): T[] {
  return reviews.map((review) => {
    const titleKey: ReviewTitleKey = `${review.id}.title`;

    return {
      ...review,
      title: t(titleKey),
      feedback: review.feedback
        ? t(`${review.id}.feedback` as ReviewFeedbackKey)
        : null,
    };
  });
}

export default async function ReviewList3D() {
  const tRaw = await getTranslations("reviewsList");

  // Wrapper tipado: evitamos `as any` y restringimos las keys válidas.
  const t = (key: ReviewI18nKey): string => tRaw(key);

  const rows = [
    { reviews: translateReviews(t, firstRow), reverse: false },
    { reviews: translateReviews(t, secondRow), reverse: true },
    { reviews: translateReviews(t, thirdRow), reverse: true },
    { reviews: translateReviews(t, fourthRow), reverse: false },
  ] as const;

  return (
    <div className="relative flex w-full h-fit items-center justify-center overflow-y-clip rounded-2xl bg-transparent">
      <ReviewDialogProvider>
        <div className="relative z-10 flex h-[1800px] items-center justify-between gap-6 bg-transparent px-4 sm:px-6 lg:px-8">
          {rows.map((col, idx) => (
            <ReviewColumn
              key={`reviews-col-${idx}`}
              reviews={col.reviews}
              reverse={col.reverse}
            />
          ))}
        </div>
      </ReviewDialogProvider>
    </div>
  );
}
