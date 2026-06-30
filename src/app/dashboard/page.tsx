import { AppShell } from "@/components/dashboard/AppShell";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { initialCampaigns, initialContacts, initialConversations } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <AppShell title="Overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Conversas abertas" value="184" hint="+12% esta semana" />
        <StatsCard label="Mensagens recebidas hoje" value="1.280" hint="+8% vs ontem" />
        <StatsCard label="Novos contatos" value="42" hint="13 qualificados" />
        <StatsCard label="Automações ativas" value="18" hint="Fluxos automáticos" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mensagens por dia da semana</h2>
            <span className="text-sm text-slate-400">Dados reais em integração</span>
          </div>
          <div className="mt-6 grid h-48 grid-cols-7 gap-2">
            {[42, 58, 63, 71, 88, 95, 76].map((value, index) => (
              <div key={index} className="flex flex-col justify-end">
                <div className="rounded-t-2xl bg-gradient-to-t from-cyan-500 to-slate-50" style={{ height: `${value}%` }} />
                <span className="mt-2 text-center text-xs text-slate-400">{["D", "S", "T", "Q", "Q", "S", "D"][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Atividades recentes</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>• Nova campanha enviada para 842 contatos.</p>
            <p>• IA respondeu 24 clientes sem intervenção humana.</p>
            <p>• QR do WAHA atualizado com sucesso.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Contatos recentes</h2>
          <div className="mt-4 space-y-3">
            {initialContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-slate-400">{contact.phone}</p>
                </div>
                <span className="text-sm text-cyan-300">{contact.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Campanhas</h2>
          <div className="mt-4 space-y-3">
            {initialCampaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{campaign.name}</p>
                  <span className="text-sm text-cyan-300">{campaign.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{campaign.audience} · {campaign.scheduledFor}</p>
                <p className="mt-2 text-sm text-slate-400">Entrega {campaign.delivered} · Leitura {campaign.opened}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold">Conversas em andamento</h2>
        <div className="mt-4 space-y-3">
          {initialConversations.map((conversation) => (
            <div key={conversation.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <div>
                <p className="font-medium">{conversation.contact}</p>
                <p className="text-sm text-slate-400">{conversation.preview}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-cyan-300">{conversation.status}</span>
                {conversation.unread > 0 && <p className="text-sm text-amber-300">{conversation.unread} não lidas</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
