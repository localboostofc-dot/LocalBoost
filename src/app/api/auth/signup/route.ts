import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const phone = body.phone?.trim();
    const companyName = body.companyName?.trim();
    const fullName = body.fullName?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const adminClient = createSupabaseAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { success: false, error: "Configuração do Supabase ausente para criação de conta." },
        { status: 500 }
      );
    }

    const { data: existingProfile, error: existingProfileError } = await adminClient
      .from("profiles")
      .select("id")
      .eq("email", email)
      .limit(1)
      .maybeSingle();

    if (existingProfileError) {
      throw existingProfileError;
    }

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: "Já existe uma conta cadastrada com este e-mail." },
        { status: 409 }
      );
    }

    const { data: createdUser, error: createUserError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        company_name: companyName || null,
        full_name: fullName || null,
        phone: phone || null,
      },
    });

    if (createUserError || !createdUser?.user) {
      throw createUserError || new Error("Não foi possível criar o usuário.");
    }

    const { error: profileError } = await adminClient.from("profiles").insert({
      id: createdUser.user.id,
      email,
      company_name: companyName || null,
      full_name: fullName || null,
      phone: phone || null,
      plan: "free",
      trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      throw profileError;
    }

    return NextResponse.json({ success: true, data: { user: createdUser.user } });
  } catch (error) {
    const err = error as any;
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Erro ao criar conta",
      },
      { status: 500 }
    );
  }
}
