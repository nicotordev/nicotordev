"use client";

import { Typography } from "@/components/ui/typography";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [isInView, value, count]);

  return (
    <div
      ref={ref}
      key={id}
      className="group flex flex-col gap-y-3 border-l-4 border-primary pl-6 transition-all duration-300 hover:border-secondary hover:pl-8"
    >
      <Typography
        as="dt"
        className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-secondary"
      >
        {name}
      </Typography>
      <Typography
        as="dd"
        role="headline"
        mood="product"
        className="order-first text-4xl font-black tracking-tight text-primary transition-all group-hover:text-secondary will-change-contents"
      >
        {leftSymbol}
        <motion.span>{rounded}</motion.span>
        {rightSymbol}
      </Typography>
    </div>
  );
}
