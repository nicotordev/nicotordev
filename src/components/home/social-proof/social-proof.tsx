import { nicolasStats } from "@/app/data/home";
import { Typography } from "@/components/ui/typography";
import ZoomableImage from "@/components/ui/zoomable-image";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import SocialProofCounterItem from "./social-proof-counter-item";

interface SocialProofSectionProps {
  messages: Messages;
}

type SocialProofMessages = NonNullable<Messages["socialProof"]>;

type SocialProofDescription = {
  intro: string;
  name: string;
  text: string;
  focus: string;
};

function BackgroundShape({
  containerClassName,
  shapeClassName,
  clipPath,
}: {
  containerClassName: string;
  shapeClassName: string;
  clipPath: string;
}) {
  return (
    <div aria-hidden="true" className={containerClassName}>
      <div style={{ clipPath }} className={shapeClassName} />
    </div>
  );
}

export default function SocialProofSection({
  messages,
}: SocialProofSectionProps) {
  const t = messages.socialProof;

  const description: SocialProofDescription = {
    intro: t?.description?.intro ?? "",
    name: t?.description?.name ?? "",
    text: t?.description?.text ?? "",
    focus: t?.description?.focus ?? "",
  };

  const statsMessages = t?.stats ?? {};
  const badgeText = t?.badge ?? "Proven experience";
  const title = t?.title ?? "Trusted by";
  const titleHighlight = t?.titleHighlight ?? "international teams";
  const titleEnd = t?.titleEnd ?? "and founders";
  const imageAlt = t?.imageAlt ?? "Nicolas working on his computer";

  const imageProps = {
    alt: imageAlt,
    src: "/images/nicolas/nico-pc.webp",
    width: 1200,
    height: 800,
    priority: true,
    sizes: "(min-width: 1024px) 50vw, 100vw",
  } as const;

  return (
    <section className="relative" id="social-proof">
      {/* Background decorations (deduped) */}
      <BackgroundShape
        containerClassName={cn(
          "absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
        )}
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative left-[calc(50%-15rem)] -translate-x-1/2",
          "aspect-1155/678 w-96 rotate-45",
          "bg-linear-to-tr from-accent to-secondary opacity-30",
          "sm:left-[calc(50%-25rem)] sm:w-3xl"
        )}
      />

      <BackgroundShape
        containerClassName={cn(
          "absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
        )}
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative right-[calc(50%-15rem)] translate-x-1/2",
          "aspect-1155/678 w-96 -rotate-135",
          "bg-linear-to-bl from-secondary to-accent opacity-30",
          "sm:right-[calc(50%-25rem)] sm:w-3xl"
        )}
      />

      <BackgroundShape
        containerClassName={cn(
          "absolute top-20 right-0 -z-10 transform-gpu overflow-x-clip blur-2xl sm:top-40"
        )}
        clipPath="polygon(63.1% 29.5%, 89.7% 45.5%, 72.4% 82.2%, 45.1% 97.1%, 21.3% 73.4%, 0.2% 49.8%, 18.9% 24.5%, 39.7% 0.5%, 63.1% 29.5%)"
        shapeClassName={cn(
          "relative left-[calc(50%+8rem)] -translate-x-1/2",
          "aspect-square w-72 -rotate-12",
          "bg-linear-to-br from-accent to-primary opacity-30",
          "sm:left-[calc(50%+20rem)] sm:w-xl"
        )}
      />

      <BackgroundShape
        containerClassName={cn(
          "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-x-clip blur-3xl",
          "sm:top-[calc(100%-30rem)]"
        )}
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative left-[calc(50%+5rem)] -translate-x-1/2",
          "aspect-1155/678 w-lg rotate-180",
          "bg-linear-to-tl from-primary to-accent opacity-30",
          "sm:left-[calc(50%+32rem)] sm:w-5xl"
        )}
      />

      <BackgroundShape
        containerClassName={cn(
          "absolute inset-x-0 top-1/2 -z-10 transform-gpu overflow-x-clip blur-3xl"
        )}
        clipPath="polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)"
        shapeClassName={cn(
          "relative left-[calc(50%-20rem)] -translate-x-1/2",
          "aspect-square w-56 rotate-90",
          "bg-linear-to-r from-accent to-primary opacity-30",
          "sm:left-[calc(50%-40rem)] sm:w-md"
        )}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-stretch justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
        {/* Desktop image */}
        <div className="hidden w-full overflow-hidden rounded-2xl border-2 border-primary shadow-lg lg:block lg:w-1/2">
          <ZoomableImage
            {...imageProps}
            containerClassName="w-full h-full"
            className="relative z-10 w-full rounded-2xl object-contain sm:h-full sm:object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2">
          <div className="mx-auto lg:mr-0 lg:max-w-lg">
            {/* Badge */}
            <Typography
              as="h2"
              role="overline"
              mood="product"
              className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30"
            >
              {badgeText}
            </Typography>

            {/* Title */}
            <Typography
              as="p"
              role="display"
              mood="product"
              className={cn(
                "mt-4 text-left font-bold tracking-tight text-foreground",
                "text-3xl sm:text-5xl", // ✅ mejor jerarquía en <500px
                "leading-tight"
              )}
            >
              {title} <span className="gradient-text">{titleHighlight}</span>{" "}
              {titleEnd}
            </Typography>

            {/* Mobile image */}
            <div className="my-4 block w-full overflow-hidden rounded-2xl border-2 border-primary lg:hidden">
              <ZoomableImage
                {...imageProps}
                containerClassName="w-full h-full"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Description */}
            <Typography
              role="body"
              className={cn(
                "mt-6 text-left text-muted-foreground",
                "text-base leading-7 sm:text-lg sm:leading-8"
              )}
            >
              {description.intro}{" "}
              <Typography as="span" className="font-bold text-foreground">
                {description.name}
              </Typography>
              {description.text}
              <br />
              <br />
              {description.focus}
            </Typography>

            {/* Stats */}
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
              {nicolasStats.map((stat) => (
                <SocialProofCounterItem
                  key={stat.id}
                  id={stat.id.toString()}
                  name={
                    statsMessages[
                      stat.key as keyof SocialProofMessages["stats"]
                    ] ?? stat.key
                  }
                  value={stat.value}
                  rightSymbol={stat.rightSymbol}
                  leftSymbol={stat.leftSymbol}
                />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
