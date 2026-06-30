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

    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id, phone, email")
      .or(`phone.eq.${normalizedPhone},email.eq.${email}`)
      .limit(1)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      throw profileError;
    }

    if (existingProfile) {
      if (existingProfile.phone === normalizedPhone) {
        return { success: false, error: "Já existe uma conta cadastrada com este número de telefone." };
      }
      if (existingProfile.email?.toLowerCase() === email) {
        return { success: false, error: "Já existe uma conta cadastrada com este e-mail." };
      }
      return { success: false, error: "Já existe uma conta cadastrada com este e-mail ou telefone." };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: params.password,
      options: {
        data: {
          company_name: params.companyName,
          full_name: params.fullName,
        },
      },
    });

    if (error) throw error;

    // Create user profile in database
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: params.email,
        phone: normalizedPhone,
        company_name: params.companyName,
        full_name: params.fullName,
        plan: "free",
        trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        return { success: false, error: "Erro ao criar perfil do usuário." };
      }
    }

    return { success: true, data };
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
