import { nicolasStats } from "@/app/data/home";
import ZoomableImage from "@/components/ui/zoomable-image";
import type { Messages } from "@/types/i18n";
import Image from "next/image";
import SocialProofCounterItem from "./social-proof-counter-item";

interface SocialProofSectionProps {
  messages: Messages;
}

export default function SocialProofSection({
  messages,
}: SocialProofSectionProps) {
  const t = messages.socialProof ?? ({} as Messages["socialProof"]);
  const media = messages.common?.a11y?.media ?? {};
  const textureAlt = media.textureAlt || "Animated texture";
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
    <section className="relative">
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt={textureAlt}
        className="h-full w-full object-cover z-1 absolute inset-0 aspect-video mix-blend-overlay opacity-30"
      />
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 flex gap-10 lg:gap-12 lg:flex-row flex-col-reverse items-stretch justify-between relative z-10 bg-transparent">
        <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl border-primary border-2 shadow-lg hidden lg:block">
          <ZoomableImage
            alt={imageAlt}
            src="/images/nicolas/nico-pc.webp"
            width={1200}
            height={800}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover rounded-2xl"
            priority
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mx-auto lg:mr-0 lg:max-w-lg">
            {/* Badge */}
            <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display">
              {badgeText}
            </h2>

            {/* Title */}
            <p className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display text-left">
              {title} <span className="gradient-text">{titleHighlight}</span>{" "}
              {titleEnd}
            </p>

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

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground font-sans text-left">
              {description.intro}{" "}
              <span className="font-bold text-foreground">
                {description.name}
              </span>
              {description.text}
              <br />
              <br />
              {description.focus}
            </p>

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
