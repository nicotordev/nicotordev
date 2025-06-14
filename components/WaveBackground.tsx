export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary wave */}
      <div className="wave-shape top-1/4 left-0 dark:opacity-30" />
      
      {/* Secondary wave */}
      <div className="wave-shape-secondary top-1/2 left-0 dark:opacity-25" />
      
      {/* Floating wave elements */}
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-purple-600/20 dark:from-pink-500/30 dark:to-purple-500/30 rounded-full wave-float" />
      
      <div className="absolute top-2/3 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 dark:from-blue-500/30 dark:to-cyan-500/30 rounded-full wave-float" style={{ animationDelay: '1s' }} />
      
      <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-600/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-full wave-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Vertical waves */}
      <div className="absolute left-1/4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-500/10 to-transparent dark:via-pink-400/20 wave-vertical" />
      
      <div className="absolute right-1/3 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent dark:via-blue-400/20 wave-vertical" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}
