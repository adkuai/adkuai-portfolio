import { NextResponse } from "next/server";
import { getViewsCount, incrementViewsCount } from "@/lib/views";

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

export async function POST() {
  const count = incrementViewsCount();
  return NextResponse.json({ count }, { headers: noCacheHeaders });
}
