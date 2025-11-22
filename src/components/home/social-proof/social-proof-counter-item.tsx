"use client";

import { useEffect, useState } from "react";

interface SocialProofCounterItemProps {
  id: string;
  name: string;
  value: number;
  rightSymbol?: string;
  leftSymbol?: string;
}

export default function SocialProofCounterItem({
  id,
  name,
  value,
  rightSymbol,
  leftSymbol,
}: SocialProofCounterItemProps) {
  const [valueToShow, setValueToShow] = useState(0); // value to show from 0 to value

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValueToShow((prev) => {
        if (prev < value) {
          return prev + 1;
        }
        // clear interval when done
        clearInterval(intervalId);
        return prev;
      });
    }, 50); // we increase 1 per second

    // clear interval on unmount
    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <div
      key={id}
      className="group flex flex-col gap-y-3 border-l-4 border-primary pl-6 transition-all duration-300 hover:border-secondary hover:pl-8"
    >
      <dt className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-secondary">
        {name}
      </dt>
      <dd className="order-first text-4xl font-black tracking-tight text-primary transition-all group-hover:text-secondary font-display will-change-contents">
        {leftSymbol}
        {valueToShow}
        {rightSymbol}
      </dd>
    </div>
  );
}
