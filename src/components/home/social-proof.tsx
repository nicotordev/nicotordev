import Image from "next/image";

const stats = [
  { id: 1, name: "Job Success", value: "100%" },
  { id: 2, name: "Projects Delivered", value: "18" },
  { id: 3, name: "Active Engagements", value: "4" },
  { id: 4, name: "Rate", value: "$26/hr" },
];

export default function Example() {
  return (
    <section className="flex items-center justify-center bg-background py-12 border-t border-b border-border/50 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl flex items-stretch">
        <Image
          alt="Nicolas working on his computer"
          src="/nicolas/me_pc.jpg"
          width={1200}
          height={800}
          className="w-2/4 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:col-start-2 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
            <h2 className="text-base/8 font-semibold text-primary font-display">
              Proven Experience
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl font-display">
              Trusted by international teams & founders
            </p>
            <p className="mt-6 text-lg/8 text-muted-foreground font-sans">
              I’m{" "}
              <span className="font-semibold text-foreground">
                Nicolas Richard
              </span>
              , a Full-Stack Web Engineer specialized in TypeScript, Next.js,
              React, Node.js, and AI-augmented systems. I’ve delivered scalable
              software to clients across Germany, Singapore, the U.S., and
              Chile—maintaining a 100% Job Success Score as a Top Rated talent
              on Upwork.
              <br />
              <br />
              My focus is building clean, fast, and purposeful products that
              elevate how teams operate.
            </p>
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col gap-y-3 border-l border-border pl-6"
                >
                  <dt className="text-sm/6 text-muted-foreground">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground font-display">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
