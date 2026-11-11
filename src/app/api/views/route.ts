import { NextRequest, NextResponse } from "next/server";
import { getViewsCount, recordIpView } from "@/lib/views";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  Pragma: "no-cache",
  Expires: "0",
};

function extractClientIp(request: NextRequest): string {
  // Standard proxy headers: Vercel, Cloudflare, Nginx, AWS ALBs
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp && xRealIp.trim()) return xRealIp.trim();

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp && cfConnectingIp.trim()) return cfConnectingIp.trim();

  const trueClientIp = request.headers.get("true-client-ip");
  if (trueClientIp && trueClientIp.trim()) return trueClientIp.trim();

  // NextRequest ip property if available in the environment
  const nextIp = (request as unknown as { ip?: string }).ip;
  if (nextIp && typeof nextIp === "string") return nextIp;

  return "127.0.0.1";
}

export async function GET() {
  const count = getViewsCount();
  return NextResponse.json({ count }, { headers: noCacheHeaders });
}

export async function POST(request: NextRequest) {
  const ip = extractClientIp(request);
  const result = recordIpView(ip);
  return NextResponse.json(result, { headers: noCacheHeaders });
}
