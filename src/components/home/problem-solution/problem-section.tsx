import { problemSectionProblems } from "@/app/data/home";
import { Typography } from "@/components/ui/typography";
import type { Messages } from "@/types/i18n";

type ProblemMessages = Messages["problemSolution"]["problem"];

interface ProblemSectionProps {
  messages?: ProblemMessages;
}

type ProblemKey = "technicalDebt" | "noVision" | "ghostDeadlines" | "excuses";

const ORDER: readonly ProblemKey[] = [
  "technicalDebt",
  "noVision",
  "ghostDeadlines",
  "excuses",
] as const;

export default function ProblemSection({ messages }: ProblemSectionProps) {
  const t = messages;

  const title = t?.title ?? "Tired of developers";
  const titleBold = t?.titleBold ?? "who do not understand your business";
  const subtitle = t?.subtitle ?? "You need a";
  const subtitleHighlight = t?.subtitleHighlight ?? "real engineer";
  const subtitleEnd =
    t?.subtitleEnd ??
    ", not a robot. Someone who understands your business and delivers code that moves the needle.";
  const sectionTitle =
    t?.sectionTitle ?? "Common problems I see in development teams:";

  const problems = ORDER.map((key) => {
    const base = problemSectionProblems.find((p) => p.key === key);
    const override = t?.problems?.[key];

    // fallback duro si faltan datos base (no debería pasar, pero mejor seguro)
    const fallback = {
      key,
      name: key,
      description: "",
      icon: undefined,
    };

    const merged = {
      ...(base ?? fallback),
      ...(override ?? {}),
    };

    return merged;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:max-w-3xl lg:text-center">
        <div className="text-foreground lg:text-center">
          <Typography
            as="h2"
            role="headline"
            className="font-black tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl"
          >
            <span className="relative inline-block">
              {title} <span className="font-black">{titleBold}</span>?
            </span>
          </Typography>
        </div>

        <Typography
          role="body"
          className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-center"
        >
          {subtitle}{" "}
          <span className="font-semibold text-foreground">
            {subtitleHighlight}
          </span>
          {subtitleEnd}
        </Typography>

        <Typography
          as="aside"
          role="title"
          mood="editorial"
          className="mt-3 text-xl sm:text-2xl lg:text-3xl italic font-light text-muted-foreground"
        >
          {sectionTitle}
        </Typography>
      </div>

      <div className="mx-auto mt-8 max-w-5xl sm:mt-12 lg:mt-16 lg:max-w-7xl">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {problems.map((problem) => {
            const IconComponent = problem.icon;

            return (
              <div key={problem.key} className="relative pl-12">
                <dt className="text-secondary">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shadow-md">
                    {IconComponent ? (
                      <IconComponent
                        className="h-5 w-5 text-secondary-foreground"
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-5 w-5 rounded-full bg-secondary-foreground"
                      />
                    )}
                  </div>

                  <Typography
                    as="span"
                    role="label"
                    className="text-base font-semibold leading-7"
                  >
                    {problem.name}
                  </Typography>
                </dt>

                <dd className="mt-1">
                  <Typography
                    role="body"
                    className="text-sm leading-7 text-muted-foreground"
                  >
                    {problem.description}
                  </Typography>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
