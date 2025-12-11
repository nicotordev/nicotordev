import { nicolasStats } from "@/app/data/home";
import { Typography } from "@/components/ui/typography";
import ZoomableImage from "@/components/ui/zoomable-image";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import SocialProofCounterItem from "./social-proof-counter-item";
interface SocialProofSectionProps {
  messages: Messages;
}

export default function SocialProofSection({
  messages,
}: SocialProofSectionProps) {
  const t = messages.socialProof ?? ({} as Messages["socialProof"]);
  const media = messages.common?.a11y?.media ?? {};
  const description = t.description ?? {
    intro: "",
    name: "",
    text: "",
    focus: "",
  };
  const statsMessages = t.stats ?? {};
  const badgeText = t.badge || "Proven experience";
  const title = t.title || "Trusted by";
  const titleHighlight = t.titleHighlight || "international teams";
  const titleEnd = t.titleEnd || "and founders";
  const imageAlt = t.imageAlt || "Nicolas working on his computer";

  return (
    <section className="relative" id="social-proof">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={cn(
            "relative left-[calc(50%-15rem)] -translate-x-1/2",
            "aspect-1155/678 w-96 rotate-45",
            "bg-linear-to-tr from-accent to-secondary opacity-30",
            "sm:left-[calc(50%-25rem)] sm:w-3xl"
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={cn(
            "relative right-[calc(50%-15rem)] translate-x-1/2",
            "aspect-1155/678 w-96 -rotate-135",
            "bg-linear-to-bl from-secondary to-accent opacity-30",
            "sm:right-[calc(50%-25rem)] sm:w-3xl"
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-20 right-0 -z-10 transform-gpu overflow-x-clip blur-2xl sm:top-40"
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 89.7% 45.5%, 72.4% 82.2%, 45.1% 97.1%, 21.3% 73.4%, 0.2% 49.8%, 18.9% 24.5%, 39.7% 0.5%, 63.1% 29.5%)",
          }}
          className={cn(
            "relative left-[calc(50%+8rem)] -translate-x-1/2",
            "aspect-square w-72 -rotate-12",
            "bg-linear-to-br from-accent to-primary opacity-30",
            "sm:left-[calc(50%+20rem)] sm:w-xl"
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={cn(
            "relative left-[calc(50%+5rem)] -translate-x-1/2",
            "aspect-1155/678 w-lg rotate-180",
            "bg-linear-to-tl from-primary to-accent opacity-30",
            "sm:left-[calc(50%+32rem)] sm:w-5xl"
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(50%)] -z-10 transform-gpu overflow-x-clip blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
          }}
          className={cn(
            "relative left-[calc(50%-20rem)] -translate-x-1/2",
            "aspect-square w-56 rotate-90",
            "bg-linear-to-r from-accent to-primary opacity-30",
            "sm:left-[calc(50%-40rem)] sm:w-md"
          )}
        />
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 flex gap-10 lg:gap-12 lg:flex-row flex-col-reverse items-stretch justify-between relative z-10 bg-transparent">
        <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl border-primary border-2 shadow-lg hidden lg:block">
          <ZoomableImage
            alt={imageAlt}
            src="/images/nicolas/nico-pc.webp"
            width={1200}
            height={800}
            containerClassName="w-full h-full"
            className="w-full object-contain sm:h-full sm:object-cover rounded-2xl relative z-10"
            preload
          />
        </div>
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
              className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-left"
            >
              {title} <span className="gradient-text">{titleHighlight}</span>{" "}
              {titleEnd}
            </Typography>

            <div className="lg:hidden w-full block my-4 border-2 border-primary rounded-2xl overflow-hidden">
              <ZoomableImage
                alt={imageAlt}
                src="/images/nicolas/nico-pc.webp"
                width={1200}
                height={800}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                preload
              />
            </div>

            <Typography
              role="body"
              className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground text-left"
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
            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
              {nicolasStats.map((stat) => (
                <SocialProofCounterItem
                  key={stat.id}
                  id={stat.id.toString()}
                  name={
                    statsMessages[stat.key as keyof typeof statsMessages] ||
                    stat.key
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
