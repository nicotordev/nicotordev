import { solutionSectionSolutions } from "@/app/data/home";
import { Typography } from "@/components/ui/typography";
import type { Messages } from "@/types/i18n";
import SolutionSectionTitles from "./solution-section-titles";
import SolutionSectionVideo from "./solution-section-video";

type SolutionMessages = Messages["problemSolution"]["solution"];
type CommonMessages = Messages["common"];

interface SolutionSectionProps {
  messages?: SolutionMessages;
  commonMessages: CommonMessages;
}

type SolutionKey =
  | "scalableArchitecture"
  | "productPartner"
  | "totalOwnership"
  | "radicalTransparency";

const ORDER: readonly SolutionKey[] = [
  "scalableArchitecture",
  "productPartner",
  "totalOwnership",
  "radicalTransparency",
] as const;

export default function SolutionSection({
  messages,
  commonMessages,
}: SolutionSectionProps) {
  const t = messages;

  const titlePrefix = t?.titlePrefix ?? "Software engineering with";
  const rotatingTitles = t?.rotatingTitles ?? [];
  const subtitle = t?.subtitle ?? "Beyond writing code,";
  const subtitleBold1 = t?.subtitleBold1 ?? "I build digital assets.";
  const subtitleText = t?.subtitleText ?? "My approach combines";
  const subtitleBold2 = t?.subtitleBold2 ?? "technical excellence";
  const subtitleWith = t?.subtitleWith ?? "with";
  const subtitleBold3 = t?.subtitleBold3 ?? "business vision";
  const subtitleTo = t?.subtitleTo ?? "to";
  const subtitleBold4 = t?.subtitleBold4 ?? "deliver lasting results";
  const sectionTitle = t?.sectionTitle ?? "How I transform your project:";

  const solutions = ORDER.map((key) => {
    const base = solutionSectionSolutions.find((s) => s.key === key);
    const override = t?.solutions?.[key];

    const fallback = {
      key,
      name: key,
      description: "",
      icon: undefined as unknown,
    };

    const merged = {
      ...(base ?? fallback),
      ...(override ?? {}),
    };

    return merged;
  });

  return (
    <section className="relative pb-16 pt-10 sm:pb-24 sm:pt-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-2 flex flex-col items-stretch justify-between gap-10 lg:flex-row lg:gap-0">
          {/* Right Column (mobile first): Video */}
          <div className="relative flex w-full justify-center lg:order-2 lg:mt-0 lg:w-1/2 lg:justify-end">
            <div className="relative w-full h-full group">
              <div className="absolute -inset-1 translate-x-4 translate-y-4 rounded-2xl bg-primary/20 blur-3xl -z-10" />
              <div className="relative h-full w-full">
                <SolutionSectionVideo commonMessages={commonMessages} />
              </div>
            </div>
          </div>

          {/* Left Column: Content */}
          <div className="flex w-full flex-col justify-center lg:order-1 lg:w-1/2 lg:pr-12">
            <div className="mx-auto w-full lg:mx-0">
              {/* Title */}
              <div className="min-h-0 sm:min-h-48 flex flex-col justify-center items-start">
                <Typography
                  as="span"
                  role="headline"
                  mood="product"
                  className="text-base sm:text-2xl text-foreground font-bold"
                >
                  {titlePrefix}
                </Typography>

                <Typography
                  as="h2"
                  role="headline"
                  mood="product"
                  className="mt-2 font-black tracking-tight text-foreground leading-tight text-left text-4xl sm:text-6xl"
                >
                  <SolutionSectionTitles titles={rotatingTitles} />
                </Typography>
              </div>

              <Typography
                role="body"
                className="mt-4 text-base leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-left"
              >
                {subtitle}{" "}
                <Typography as="span" className="font-semibold text-foreground">
                  {subtitleBold1}{" "}
                </Typography>
                {subtitleText}{" "}
                <Typography as="span" className="font-semibold text-foreground">
                  {subtitleBold2}
                </Typography>{" "}
                {subtitleWith}{" "}
                <Typography as="span" className="font-semibold text-foreground">
                  {subtitleBold3}
                </Typography>{" "}
                {subtitleTo}{" "}
                <Typography as="span" className="font-semibold text-primary">
                  {subtitleBold4}
                </Typography>
                .
              </Typography>

              <Typography
                as="aside"
                role="title"
                mood="editorial"
                className="mt-3 mb-4 italic font-light text-muted-foreground text-left text-xl sm:text-3xl"
              >
                {sectionTitle}
              </Typography>

              <dl className="space-y-5">
                {solutions.map((solution) => {
                  const IconComponent =
                    (
                      solution as {
                        icon?: React.ComponentType<{
                          className?: string;
                          "aria-hidden"?: boolean;
                        }>;
                      }
                    ).icon ?? null;

                  return (
                    <div key={solution.key} className="relative pl-12">
                      <dt className="text-foreground">
                        <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md">
                          {IconComponent ? (
                            <IconComponent className="h-5 w-5 text-primary-foreground" />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="h-5 w-5 rounded-full bg-primary-foreground"
                            />
                          )}
                        </div>

                        <Typography
                          as="span"
                          role="label"
                          className="text-base font-semibold leading-7 text-foreground"
                        >
                          {solution.name}
                        </Typography>
                      </dt>

                      <dd className="mt-1">
                        <Typography
                          role="body"
                          className="text-sm leading-7 text-muted-foreground"
                        >
                          {solution.description}
                        </Typography>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
