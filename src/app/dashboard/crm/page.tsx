import { AppShell } from "@/components/dashboard/AppShell";
import { initialContacts } from "@/lib/constants";

export default function CRMPage() {
  return (
    <AppShell title="CRM">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Contatos e pipeline</h2>
          <p className="text-sm text-slate-400">CRUD de contatos, tags, pipeline e histórico de conversas.</p>
        </div>
        <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Adicionar contato</button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['Todos', 'Novo', 'Qualificado', 'Cliente'].map((filter) => (
              <span key={filter} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-400">{filter}</span>
            ))}
          </div>
          <div className="space-y-3">
            {initialContacts.map((contact) => (
              <div key={contact.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-slate-400">{contact.phone}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-300">{contact.tag}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                  <span>{contact.lastActivity}</span>
                  <span>Valor: {contact.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Pipeline de vendas</h3>
          <div className="mt-4 space-y-3">
            {[
              ['Novo', '4 oportunidades'],
              ['Qualificado', '3 oportunidades'],
              ['Em negociação', '2 oportunidades'],
              ['Cliente', '1 oportunidade'],
            ].map(([stage, amount]) => (
              <div key={stage} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-400">
                <div className="flex items-center justify-between">
                  <span>{stage}</span>
                  <span className="text-cyan-300">{amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
