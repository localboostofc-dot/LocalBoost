import { NextResponse } from "next/server";
import { appendWebhookMessage } from "@/lib/waha";

export async function POST(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = `Basic ${Buffer.from(`${process.env.WAHA_USERNAME ?? "admin"}:${process.env.WAHA_PASSWORD ?? "localboost"}`).toString("base64")}`;

  if (auth && auth !== expected) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  appendWebhookMessage("received", JSON.stringify(payload));

  return NextResponse.json({ ok: true, received: true });
}
