// utils/replaceTextWithNode.ts
import type { ReactNode } from "react";

export function replaceTextWithNode(
  text: string,
  search: string | RegExp,
  replacement: ReactNode
): ReactNode[] {
  // Normalize pattern → always a global RegExp
  const regex =
    typeof search === "string"
      ? new RegExp(escapeRegExp(search), "g")
      : new RegExp(
          search.source,
          search.flags.includes("g") ? search.flags : search.flags + "g"
        );

  const out: ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add the text before the match
    const before = text.slice(lastIndex, match.index);
    if (before) out.push(before);

    // Insert the React node — key needed for array slots
    out.push(<span key={key++}>{replacement}</span>);

    lastIndex = regex.lastIndex;
  }

  // Add leftover text
  const rest = text.slice(lastIndex);
  if (rest) out.push(rest);

  return out;
}

// Escape regex characters
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
