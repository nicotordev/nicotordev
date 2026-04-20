#!/usr/bin/env bash
# Regenerate CV derivatives from the canonical PDF in public/documents/.
#
# Requires (system): poppler — pdftotext, pdftohtml, pdftoppm, pdfinfo
# Optional (Bun global): pdf-text-extract — bun install -g pdf-text-extract
#   Preview text: pdf-text-extract public/documents/Nicolas-Torres-Henriquez-2026-CV.pdf
#
# Note: @opendocsg/pdf2md (bun install -g @opendocsg/pdf2md) provides `pdf2md` for PDF→Markdown
# from input/output folders; some PDFs may fail depending on Node/pdf.js compatibility.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOC="$ROOT/public/documents"
PDF="$DOC/Nicolas-Torres-Henriquez-2026-CV.pdf"
BASE="Nicolas-Torres-Henriquez-2026-CV"

if [[ ! -f "$PDF" ]]; then
  echo "Missing source PDF: $PDF" >&2
  exit 1
fi

command -v pdftotext >/dev/null || {
  echo "Install poppler (pdftotext, pdftohtml, pdftoppm, pdfinfo)." >&2
  exit 1
}

pdftotext "$PDF" "$DOC/${BASE}.txt"

{
  printf '%s\n\n' "# Nicolas Richard Torres Henriquez"
  printf '%s\n\n' "_Exportado desde el PDF del CV._"
  cat "$DOC/${BASE}.txt"
} >"$DOC/${BASE}.md"

pdftohtml -s -noframes "$PDF" "$DOC/${BASE}.html.build" >/dev/null
mv -f "$DOC/${BASE}.html.build.html" "$DOC/${BASE}.html"
rm -f "$DOC/${BASE}.html.build"*

pdftoppm -png -r 144 "$PDF" "$DOC/${BASE}-page"

pdfinfo "$PDF" >"$DOC/${BASE}.info.txt"

echo "OK: $DOC/${BASE}.{txt,md,html,png*,pdf,info.txt}"
