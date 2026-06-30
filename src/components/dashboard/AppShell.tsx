"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/whatsapp", label: "WhatsApp" },
  { href: "/dashboard/crm", label: "CRM" },
  { href: "/dashboard/marketing", label: "Marketing" },
  { href: "/dashboard/ai", label: "IA" },
  { href: "/dashboard/knowledge", label: "Base de Conhecimento" },
  { href: "/dashboard/billing", label: "Assinatura" },
  { href: "/dashboard/admin", label: "Admin" },
];

export function AppShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-slate-900/80 p-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-2xl font-semibold">LocalBoost</p>
            <p className="text-sm text-slate-400">Painel empresarial</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center rounded-2xl px-3 py-2 text-sm ${active ? "bg-cyan-500/15 text-cyan-300" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
            <p className="font-semibold text-white">Plano ativo</p>
            <p className="mt-1">Pro · R$ 97/mês</p>
            <p className="mt-2 text-xs">Trial gratuito ativo por 7 dias</p>
          </div>
          <Link href="/" className="mt-6 inline-flex text-sm text-slate-400 hover:text-white">Sair da conta</Link>
        </aside>
        <main className="flex-1 p-5 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
              <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Status: Operando</div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
