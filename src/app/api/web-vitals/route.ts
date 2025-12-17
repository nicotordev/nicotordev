export const runtime = "edge";

export async function POST(request: Request): Promise<Response> {
  // CWV: Keep the handler minimal (fast 204). Processing/storage can be added later.
  // We still read the body to avoid connection reuse issues in some runtimes.
  try {
    await request.text();
  } catch {
    // Ignore malformed payloads.
  }

  return new Response(null, { status: 204 });
}

