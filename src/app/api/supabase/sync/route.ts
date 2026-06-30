import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase.from("contacts").insert({
    name: body.name ?? "Cliente LocalBoost",
    phone: body.phone ?? "+55 000000000",
    status: body.status ?? "novo",
    tag: body.tag ?? "localboost",
    metadata: body.metadata ?? {},
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
