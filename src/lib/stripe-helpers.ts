import { supabase } from "@/lib/supabase";

export interface CheckoutParams {
  userId: string;
  planId: "starter" | "pro" | "business";
}

export async function initiateCheckout(params: CheckoutParams) {
  try {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: params.userId,
        planId: params.planId,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "Erro ao iniciar checkout");
    }

    return { success: true, url: data.url, sessionId: data.sessionId };
  } catch (error) {
    const err = error as any;
    return { success: false, error: err.message };
  }
}

export async function getUserPlan(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("plan, stripe_subscription_status, subscription_current_period_end")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
}

export async function getPlanFeatures(plan: string) {
  const features: Record<string, string[]> = {
    free: [
      "1 número do WhatsApp",
      "1000 conversas mensais",
      "Automações básicas",
      "Suporte por email",
    ],
    starter: [
      "Até 3 números do WhatsApp",
      "10000 conversas mensais",
      "Automações avançadas",
      "IA para respostas",
      "Suporte prioritário",
    ],
    pro: [
      "Até 10 números do WhatsApp",
      "50000 conversas mensais",
      "Todas as automações",
      "IA avançada com contexto",
      "Relatórios detalhados",
      "Suporte 24/7",
    ],
    business: [
      "Números ilimitados",
      "Conversas ilimitadas",
      "Tudo do plano Pro",
      "API completa",
      "Integração com CRM",
      "Gerente de conta dedicado",
    ],
  };

  return features[plan] || features.free;
}
