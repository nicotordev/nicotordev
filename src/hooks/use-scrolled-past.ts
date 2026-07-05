"use client";

import { useEffect, useRef, useState } from "react";

export function useScrolledPast(threshold = 8) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setScrolled(!entry.isIntersecting);
      },
      {
        rootMargin: `${threshold}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { scrolled, sentinelRef };
}
