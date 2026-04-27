import fs from "node:fs";
import path from "node:path";

import { assets, type ResumeFormatKey } from "@/app/assets";

/** Resume files present under `public/` (server-only). */
export function getExistingResumeFormatKeys(): ResumeFormatKey[] {
  const publicRoot = path.join(process.cwd(), "public");
  return (Object.keys(assets.resume) as ResumeFormatKey[]).filter((key) => {
    const href = assets.resume[key];
    const relative = href.startsWith("/") ? href.slice(1) : href;
    return fs.existsSync(path.join(publicRoot, relative));
  });
}
