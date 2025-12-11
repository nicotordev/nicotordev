import { problemSectionProblems } from "@/app/data/home";
import { Typography } from "@/components/ui/typography";
import type { Messages } from "@/types/i18n";

interface ProblemSectionProps {
  messages: Messages["problemSolution"]["problem"];
}

export default function ProblemSection({ messages }: ProblemSectionProps) {
  const t = messages;
  const title = t.title || "Tired of developers";
  const titleBold = t.titleBold || "who do not understand your business";
  const subtitle = t.subtitle || "You need a";
  const subtitleHighlight = t.subtitleHighlight || "real engineer";
  const subtitleEnd =
    t.subtitleEnd ||
    ", not a robot. Someone who understands your business and delivers code that moves the needle.";
  const sectionTitle =
    t.sectionTitle || "Common problems I see in development teams:";

  const problemsWithTranslations = [
    { ...problemSectionProblems[0], ...t.problems?.technicalDebt },
    { ...problemSectionProblems[1], ...t.problems?.noVision },
    { ...problemSectionProblems[2], ...t.problems?.ghostDeadlines },
    { ...problemSectionProblems[3], ...t.problems?.excuses },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mx-auto lg:max-w-3xl lg:text-center">
        <div className="lg:text-center text-foreground">
          <Typography
            as="h2"
            role="headline"
            className="text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            <span className="relative inline-block mx-1">
              {title} <b>{titleBold}</b>?
            </span>
          </Typography>
        </div>

        <Typography
          role="body"
          className="mt-4 text-xl leading-9 text-muted-foreground lg:text-center"
        >
          {subtitle}{" "}
          <span className="font-semibold text-foreground">
            {subtitleHighlight}
          </span>
          {subtitleEnd}
          <br />
        </Typography>
        <Typography
          as="aside"
          role="title"
          mood="editorial"
          className="italic text-3xl text-muted-foreground font-light mt-2"
        >
          {sectionTitle}
        </Typography>
      </div>
      <div className="mx-auto mt-8 max-w-5xl sm:mt-12 lg:mt-16 lg:max-w-7xl">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {problemsWithTranslations.map((problem, index) => {
            const IconComponent = problemSectionProblems[index]?.icon;
            return (
              <div key={problem.name} className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-secondary">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shadow-md">
                    {IconComponent ? (
                      <IconComponent
                        className="h-5 w-5 text-secondary-foreground"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="h-5 w-5 bg-secondary-foreground rounded-full" />
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
