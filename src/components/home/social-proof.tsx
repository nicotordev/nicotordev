import Image from "next/image";

const stats = [
  { id: 1, name: "Job Success", value: "100%" },
  { id: 2, name: "Projects Delivered", value: "18" },
  { id: 3, name: "Active Engagements", value: "4" },
  { id: 4, name: "Rate", value: "$26/hr" },
];

export default function SocialProofSection() {
  return (
   <section className="flex items-center justify-center bg-gray-200/50 px-6 sm:px-12 lg:px-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl flex items-stretch">
        <Image
          alt="Nicolas working on his computer"
          src="/nicolas/me_pc.jpg"
          width={1200}
          height={800}
          className="w-2/4 h-auto object-cover rounded-2xl shadow-2xl ring-4 ring-primary/30 hover:ring-primary/60 transition-all duration-500 hover:scale-[1.02]"
          priority
        />
        <div className="px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:col-start-2 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
            {/* Proven Experience → ahora con fondo rosa suave */}
            <h2 className="inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-primary ring-2 ring-primary/30 font-display">
              Proven Experience
            </h2>

            {/* Título grande con gradiente rosa → morado */}
            <p className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                international teams
              </span>{" "}
              & founders
            </p>

            <p className="mt-6 text-lg leading-8 text-muted-foreground font-sans">
              I’m{" "}
              <span className="font-bold text-foreground">
                Nicolas Torres
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

            {/* Stats con borde rosa y hover morado */}
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="group flex flex-col gap-y-3 border-l-4 border-primary pl-6 transition-all duration-300 hover:border-secondary hover:pl-8"
                >
                  <dt className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-secondary">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-4xl font-black tracking-tight text-primary transition-colors group-hover:text-secondary font-display">
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
