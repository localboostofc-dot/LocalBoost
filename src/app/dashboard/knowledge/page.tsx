import { AppShell } from "@/components/dashboard/AppShell";
import { initialKnowledgeBase } from "@/lib/constants";

export default function KnowledgePage() {
  return (
    <AppShell title="Base de Conhecimento">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Gerenciar contexto da IA</h2>
          <p className="mt-2 text-sm text-slate-400">Cadastre produtos, preços, horários, FAQs e documentos para que a IA responda com contexto.</p>
          <div className="mt-6 space-y-3">
            <textarea className="min-h-40 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4" defaultValue={initialKnowledgeBase.join("\n")} />
            <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Salvar contexto</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Documentos e arquivos</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">PDF · Catálogo de produtos</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">DOCX · Política de atendimento</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Planilha · Preços e promoções</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
