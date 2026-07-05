import type { Messages } from "@/types/i18n";

export type AboutStat = {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
};

export function getAboutStats(messages: Messages): AboutStat[] {
  const metrics = messages.about.metrics;
  const experienceRaw = metrics.experienceValue;
  const [experienceValue, ...experienceSuffixParts] = experienceRaw.split(" ");
  const experienceSuffix = experienceSuffixParts.join(" ").trim();

  return [
    {
      label: metrics.total_earnings,
      prefix: "$",
      value: "50",
      suffix: "K+",
    },
    {
      label: metrics.hours,
      value: "~3.6K",
      suffix: " hrs",
    },
    {
      label: metrics.success,
      value: "99.99",
      suffix: "%",
    },
    {
      label: metrics.experience,
      value: experienceValue || experienceRaw,
      suffix: experienceSuffix,
    },
  ];
}

export function formatAboutStatValue(stat: AboutStat): string {
  return `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;
}
