"use client";

import { AppShell } from "@/components/dashboard/AppShell";
import { plans } from "@/lib/constants";
import { StripeButton } from "@/components/StripeButton";

export default function BillingPage() {
  return (
    <AppShell title="Assinatura">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Planos e cobrança</h2>
          <p className="mt-2 text-sm text-slate-400">
            Escolha o plano Starter para continuar usando o LocalBoost após o período de avaliação.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {plans.filter((plan) => plan.id !== "free").map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="font-semibold">{plan.name}</p>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                <p className="mt-3 text-2xl font-semibold">R$ {plan.price}</p>
                <p className="mt-1 text-sm text-slate-400">ou R$ {plan.annualPrice}/ano</p>
                <StripeButton planId={plan.id} className="mt-4 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950" >
                  Assinar {plan.name}
                </StripeButton>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Status do pagamento</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Assinatura: Verifique se já terminou o período de teste</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Para continuar, selecione Starter ou superior</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Pagamentos são cobrados via Stripe</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
