import WaveBackground from "./WaveBackground";

export default function AnimatedBackgroundBlobs() {
    return (
        <>
            {/* Wave Background */}
            <WaveBackground />

            {/* Enhanced Background with mesh gradient */}
            <div className="absolute inset-0 bg-mesh dark:opacity-20" />
            <div className="blob blob-primary blob-large -top-48 -left-48 dark:opacity-20" />
            <div className="blob blob-secondary -top-32 -right-32 dark:opacity-15" />
            <div className="blob blob-accent -bottom-32 -left-32 dark:opacity-10" />
            <div className="blob blob-primary blob-small -bottom-48 -right-48 dark:opacity-25" />
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-dots opacity-30 dark:opacity-10" />
        </>
    )
}