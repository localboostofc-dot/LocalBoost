"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      setIsAuthenticated(false);
      setIsBlocked(false);
      return;
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("plan, trial_ends_at")
      .eq("id", session.user.id)
      .single();

    if (profileError || !data) {
      setIsAuthenticated(false);
      setIsBlocked(false);
      return;
    }

    const trialEndsAt = data.trial_ends_at ? new Date(data.trial_ends_at) : null;
    const trialExpired = trialEndsAt ? new Date() > trialEndsAt : false;
    const isFree = data.plan === "free";

    if (isFree && trialExpired) {
      setIsAuthenticated(true);
      setIsBlocked(true);
      setBlockMessage(
        "Seu período de teste de 7 dias terminou. Assine o plano Starter para continuar usando o app."
      );
      return;
    }

    setIsAuthenticated(true);
    setIsBlocked(false);
  }

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <p className="text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
          <h1 className="mt-3 text-3xl font-semibold">Acesso negado</h1>
          <p className="mt-3 text-sm text-slate-400">
            Você precisa estar autenticado para acessar o painel.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href="/login"
              className="block rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950"
            >
              Fazer login
            </Link>
            <Link
              href="/register"
              className="block rounded-2xl border border-white/10 px-4 py-3 font-semibold text-slate-300"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isBlocked && pathname !== "/dashboard/billing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
          <h1 className="mt-3 text-3xl font-semibold">Acesso bloqueado</h1>
          <p className="mt-3 text-sm text-slate-400">{blockMessage}</p>
          <div className="mt-6 space-y-3">
            <Link
              href="/dashboard/billing"
              className="block rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950"
            >
              Ir para Assinatura
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
