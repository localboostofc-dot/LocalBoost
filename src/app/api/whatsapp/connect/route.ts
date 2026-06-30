import { NextResponse } from "next/server";
import { createWahaSession, getWahaSessionByUser } from "@/lib/waha";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

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

  const existing = getWahaSessionByUser(userId);

  if (existing) {
    return NextResponse.json(existing);
  }

  const session = await createWahaSession(userId);
  return NextResponse.json(session);
}
