import { getMessages } from "next-intl/server";
import Image from "next/image";
import SocialProofCounterItem from "./social-proof-counter-item";

const stats = [
  { id: 1, key: "jobSuccess", value: 100, rightSymbol: "%", leftSymbol: "" },
  {
    id: 2,
    key: "projectsDelivered",
    value: 18,
    rightSymbol: "",
    leftSymbol: "",
  },
  {
    id: 3,
    key: "activeEngagements",
    value: 4,
    rightSymbol: "",
    leftSymbol: "",
  },
  { id: 4, key: "rate", value: 26, rightSymbol: "/hr", leftSymbol: "$" },
];

export default async function SocialProofSection() {
  const messages = await getMessages();
  const t = messages.socialProof as any;
  const media = (messages.common as any)?.a11y?.media ?? {};
  const textureAlt = media.textureAlt || "Animated texture";

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
        <div className="w-full lg:w-1/2">
          <Image
            alt={t.imageAlt}
            src="/images/nicolas/nico-pc.webp"
            width={1200}
            height={800}
            className="w-full h-full object-cover rounded-2xl transition-all duration-500 hover:scale-[1.5] max-w-full"
            priority
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mx-auto lg:mr-0 lg:max-w-lg">
            {/* Badge */}
            <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display">
              {t.badge}
            </h2>

            {/* Title */}
            <p className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display text-left">
              {t.title}{" "}
              <span className="gradient-text">{t.titleHighlight}</span>{" "}
              {t.titleEnd}
            </p>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground font-sans text-left">
              {t.description.intro}{" "}
              <span className="font-bold text-foreground">
                {t.description.name}
              </span>
              {t.description.text}
              <br />
              <br />
              {t.description.focus}
            </p>

            {/* Stats */}
            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
              {stats.map((stat) => (
                <SocialProofCounterItem
                  key={stat.id}
                  id={stat.id.toString()}
                  name={t.stats[stat.key]}
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
