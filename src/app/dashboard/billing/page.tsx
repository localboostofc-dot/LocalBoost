import { AppShell } from "@/components/dashboard/AppShell";
import { plans } from "@/lib/constants";

export default function BillingPage() {
  return (
    <AppShell title="Assinatura">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Planos e cobrança</h2>
          <p className="mt-2 text-sm text-slate-400">Integração prevista com Stripe para cobrança mensal e anual com Webhook de assinatura real.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {plans.filter((plan) => plan.id !== "free").map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="font-semibold">{plan.name}</p>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                <p className="mt-3 text-2xl font-semibold">R$ {plan.price}</p>
                <button className="mt-4 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Assinar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Status do pagamento</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Assinatura: Pro · Ativa</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Próxima cobrança: 15/07/2026</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">MRR: R$ 97</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
