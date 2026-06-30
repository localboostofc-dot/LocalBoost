import { NextResponse } from "next/server";
import { appendWebhookMessage, getWahaSessionByUser } from "@/lib/waha";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const userId = body.userId;

  if (!userId) {
    return NextResponse.json(
      { ok: false, message: "userId é obrigatório" },
      { status: 400 }
    );
  }

  // Verify user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user || user.id !== userId) {
    return NextResponse.json(
      { ok: false, message: "Não autorizado" },
      { status: 401 }
    );
  }

  const session = getWahaSessionByUser(userId);

  if (!session || session.status !== "connected") {
    return NextResponse.json(
      { ok: false, message: "A sessão WAHA ainda não está conectada." },
      { status: 409 }
    );
  }

  const payload = {
    to: body.to,
    message: body.message,
    provider: process.env.WAHA_BASE_URL ? "WAHA" : "simulado",
    timestamp: new Date().toISOString(),
  };

  appendWebhookMessage("sent", `Mensagem enviada para ${payload.to}`);

  return NextResponse.json({ ok: true, payload });
}
