// Server-side redirect so the real RSVP URL stays out of the client bundle/HTML.
// Reads a server-only env var (RSVP_URL — no NEXT_PUBLIC_ prefix).
export const dynamic = "force-dynamic";

export function GET() {
  const url = process.env.RSVP_URL;
  if (!url) {
    return new Response("RSVP link not configured", { status: 404 });
  }
  return Response.redirect(url, 302);
}
