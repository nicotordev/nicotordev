import AnimatedBackgroundBlobs from "./AnimatedBackgroundBlobs";

export default function AboutMeSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AnimatedBackgroundBlobs />
    </section>
  )
}