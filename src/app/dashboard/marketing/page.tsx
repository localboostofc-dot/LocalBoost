import { AppShell } from "@/components/dashboard/AppShell";
import { initialCampaigns } from "@/lib/constants";

export default function MarketingPage() {
  return (
    <AppShell title="Marketing">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Campanhas e jornadas automáticas</h2>
          <p className="text-sm text-slate-400">Criação, segmentação, agendamento e métricas reais.</p>
        </div>
        <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Nova campanha</button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="space-y-3">
            {initialCampaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{campaign.name}</p>
                  <span className="text-sm text-cyan-300">{campaign.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Audiência: {campaign.audience}</p>
                <p className="mt-1 text-sm text-slate-400">Agendada para {campaign.scheduledFor}</p>
                <div className="mt-3 flex gap-4 text-sm text-slate-400">
                  <span>Entregues: {campaign.delivered}</span>
                  <span>Leituras: {campaign.opened}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Métricas</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">Taxa de abertura: 72%</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">Conversões: 18%</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">Receita gerada: R$ 8.300</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
