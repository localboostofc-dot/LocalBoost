"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { supabase } from "@/lib/supabase";
import { updateUserPlan } from "@/lib/auth";

const planOptions = ["free", "starter", "pro", "business"] as const;

type PlanKey = (typeof planOptions)[number];

type AdminUser = {
  id: string;
  email: string;
  company_name: string | null;
  plan: PlanKey;
  trial_ends_at: string | null;
};

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, company_name, plan, trial_ends_at");

    if (error) {
      console.error("Erro ao carregar usuários:", error);
      setLoading(false);
      return;
    }

    setUsers((data || []) as AdminUser[]);
    setLoading(false);
  }

  async function handlePlanChange(userId: string, plan: PlanKey) {
    setSavingId(userId);
    setStatusMessage("");

    const result = await updateUserPlan(userId, plan);

    if (result.success) {
      setStatusMessage(`Plano do usuário atualizado para ${plan}.`);
      await loadUsers();
    } else {
      setStatusMessage(result.error || "Erro ao atualizar plano.");
    }

    setSavingId(null);
  }

  return (
    <AppShell title="Admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Gerenciar planos dos usuários</h2>
          <p className="mt-2 text-sm text-slate-400">
            Admin principal: joaopedromoladeoliveira@gmail.com. Ele pode adicionar outros admins, mas não pode ser removido.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            O admin pode definir o plano de cada usuário. Usuários com plano free terão o acesso bloqueado após 7 dias.
          </p>

          {statusMessage && (
            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm text-cyan-200">
              {statusMessage}
            </div>
          )}

          {loading ? (
            <p className="mt-6 text-sm text-slate-400">Carregando usuários...</p>
          ) : (
            <div className="mt-6 space-y-4">
              {users.map((user) => (
                <div key={user.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{user.company_name || user.email}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                      <p className="text-sm text-slate-400">Plano atual: {user.plan}</p>
                      {user.trial_ends_at && (
                        <p className="text-sm text-slate-400">
                          Trial até: {new Date(user.trial_ends_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 sm:items-end">
                      <select
                        value={user.plan}
                        onChange={(event) => handlePlanChange(user.id, event.target.value as PlanKey)}
                        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-100"
                      >
                        {planOptions.map((plan) => (
                          <option key={plan} value={plan} className="bg-slate-950 text-slate-100">
                            {plan}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handlePlanChange(user.id, user.plan)}
                        disabled={savingId === user.id}
                        className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
                      >
                        {savingId === user.id ? "Salvando..." : "Salvar plano"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
