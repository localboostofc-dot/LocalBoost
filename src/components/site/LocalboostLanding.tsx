import Link from "next/link";
import { featureBullets, heroStats, plans } from "@/lib/constants";

export function LocalboostLanding() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-2xl font-semibold tracking-tight">LocalBoost</p>
          <p className="text-sm text-slate-400">Transformando conversas em clientes.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm">Entrar</Link>
          <Link href="/register" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Criar conta</Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 lg:px-8">
        <section className="grid items-center gap-10 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">SaaS premium para negócios locais</span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Automação de WhatsApp, IA e CRM em uma só plataforma.</h1>
            <p className="max-w-2xl text-lg text-slate-300">LocalBoost ajuda restaurantes, clínicas, lojas e prestadores de serviços a converter conversas em vendas com automações inteligentes, atendimento 24/7 e painéis executivos.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950">Começar agora</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Stack e produção</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {featureBullets.map((item) => (
                <li key={item} className="flex items-center gap-2"><span className="text-cyan-300">•</span>{item}</li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
              <p className="font-semibold">WAHA + QR automático</p>
              <p className="mt-1">O usuário apenas abre o WhatsApp e escaneia o QR para conectar, sem configurações técnicas.</p>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-6 lg:grid-cols-3">
          {[
            ["Automação inteligente", "Crie fluxos de atendimento, respostas automáticas e lembretes sem depender de equipe manual."],
            ["IA para vendas", "A IA responde com contexto, consulta a base do negócio e qualifica leads em tempo real."],
            ["Painel executivo", "Acompanhe conversas, receita, campanhas, engajamento e status do WhatsApp num só lugar."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </section>

        <section id="pricing" className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Planos</p>
              <h2 className="text-3xl font-semibold">Escolha o plano ideal para crescer</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-400">Foco em escala, segurança e produção. Os planos incluem trial de 7 dias no plano free e assinatura mensal ou anual.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.id} className={`rounded-2xl border p-5 ${plan.highlight ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-slate-950/60"}`}>
                <p className="text-lg font-semibold">{plan.name}</p>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl font-semibold">R$ {plan.price}</span>
                  <span className="text-sm text-slate-400">/mês</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">ou R$ {plan.annualPrice}/ano</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
                </ul>
                <Link href="/register" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Assinar</Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        LocalBoost © 2026 · Segurança, escalabilidade e UX premium para negócios locais.
      </footer>
    </div>
  );
}
