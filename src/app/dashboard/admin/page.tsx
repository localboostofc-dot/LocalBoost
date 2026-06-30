import { AppShell } from "@/components/dashboard/AppShell";

export default function AdminPage() {
  return (
    <AppShell title="Admin">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Usuários e permissões</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Admin · João · Plano Business</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Gerente · Mariana · Plano Pro</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Agente · Pedro · Plano Starter</div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Receita da plataforma</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">MRR: R$ 18.400</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">ARR: R$ 220.800</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Clientes ativos: 84</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
