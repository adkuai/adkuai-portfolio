import { NextRequest, NextResponse } from "next/server";
import { getViewsCount, registerDeviceVisit } from "@/lib/views";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  const count = getViewsCount();
  return NextResponse.json({ count }, { headers: noCacheHeaders });
}

export async function POST(request: NextRequest) {
  let deviceId = "";

  try {
    const body = await request.json().catch(() => ({}));
    if (typeof body.deviceId === "string") {
      deviceId = body.deviceId;
    }
  } catch {}

  // Fallback to query param if not in body
  if (!deviceId) {
    const url = new URL(request.url);
    deviceId = url.searchParams.get("deviceId") || "";
  }

  // Register device visit: increments by 1 if new device, does not increment if already seen
  const result = registerDeviceVisit(deviceId);

  return NextResponse.json(result, { headers: noCacheHeaders });
}
