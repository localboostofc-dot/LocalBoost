import { supabase } from "./supabase";

export interface SignUpParams {
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  fullName?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    return digits;
  }
  return null;
};

export async function signUp(params: SignUpParams) {
  try {
    const phone = params.phone?.trim();
    const email = params.email?.trim().toLowerCase();

    if (!phone) {
      return { success: false, error: "O telefone é obrigatório." };
    }

    if (!email) {
      return { success: false, error: "O e-mail é obrigatório." };
    }

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      return { success: false, error: "Telefone inválido." };
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: params.password,
        phone: normalizedPhone,
        companyName: params.companyName,
        fullName: params.fullName,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || "Erro ao criar conta",
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    const err = error as any;
    return {
      success: false,
      error: err.message || "Erro ao criar conta",
    };
  }
}

export async function signIn(params: SignInParams) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    const err = error as any;
    return { 
      success: false, 
      error: err.message || "Erro ao fazer login" 
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    const err = error as any;
    return { 
      success: false, 
      error: err.message || "Erro ao fazer logout" 
    };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateUserPlan(userId: string, plan: string, stripeCustomerId?: string) {
  try {
    const updatePayload: Record<string, unknown> = {
      plan,
      stripe_customer_id: stripeCustomerId,
    };

    if (plan !== "free") {
      updatePayload.trial_ends_at = null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updatePayload)
      .eq("id", userId)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    const err = error as any;
    return { 
      success: false, 
      error: err.message || "Erro ao atualizar plano" 
    };
  }
}
