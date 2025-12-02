import Image from "next/image";
import SocialProofCounterItem from "./social-proof-counter-item";
import { getMessages } from "next-intl/server";

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
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8">
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt={textureAlt}
        className="h-full w-full object-cover z-1 absolute inset-0 aspect-video mix-blend-overlay opacity-30"
      />
      <div className="mx-auto max-w-7xl flex items-stretch justify-between relative z-10 bg-transparent">
        <div className="w-2/4 h-auto rounded-2xl shadow-2xl ring-4 ring-accent/30 hover:ring-accent/60 overflow-clip hover-lift">
          <Image
            alt={t.imageAlt}
            src="/images/nicolas/nico-pc.webp"
            width={1200}
            height={800}
            className="w-full h-full object-cover rounded-2xl transition-all duration-500 hover:scale-[1.5]"
            priority
          />
        </div>
        <div className="px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:col-start-2 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
            {/* Badge */}
            <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display">
              {t.badge}
            </h2>

            {/* Title */}
            <p className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display">
              {t.title}{" "}
              <span className="gradient-text">{t.titleHighlight}</span>{" "}
              {t.titleEnd}
            </p>

            <p className="mt-6 text-lg leading-8 text-muted-foreground font-sans">
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
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
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
