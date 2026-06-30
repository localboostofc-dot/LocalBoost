import { NextResponse } from "next/server";
import { createWahaSession, getWahaSessionByUser } from "@/lib/waha";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? "demo-user";
  const existing = getWahaSessionByUser(userId);

  if (existing) {
    return NextResponse.json(existing);
  }

  const session = await createWahaSession(userId);
  return NextResponse.json(session);
}
