"use client";

import { getWebVitalsReporter } from "@/lib/performance/web-vitals";
import { useReportWebVitals } from "next/web-vitals";
import { useMemo } from "react";

export default function WebVitalsReporter() {
  // CWV: Keep the callback stable to avoid re-subscribing and extra work.
  const report = useMemo(() => getWebVitalsReporter(), []);
  useReportWebVitals(report);
  return null;
}

