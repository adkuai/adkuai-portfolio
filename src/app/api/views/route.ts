import { NextResponse } from "next/server";
import { getViewsCount, incrementViewsCount } from "@/lib/views";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = getViewsCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const count = incrementViewsCount();
  return NextResponse.json({ count });
}
