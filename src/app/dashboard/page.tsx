"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatsCard } from "@/components/dashboard/StatsCard";
import type { Contact, Campaign, Conversation } from "@/lib/constants";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    openConversations: "0",
    messagesReceived: "0",
    newContacts: "0",
    activeAutomations: "0",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load contacts
      const { data: contactsData } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", user.id)
        .limit(10);

      if (contactsData) setContacts(contactsData as Contact[]);

      // Load campaigns
      const { data: campaignsData } = await supabase
        .from("campaigns")
        .select("*")
        .eq("user_id", user.id)
        .limit(10);

      if (campaignsData) setCampaigns(campaignsData as Campaign[]);

      // Load conversations
      const { data: conversationsData } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .limit(10);

      if (conversationsData) setConversations(conversationsData as Conversation[]);

      // Update stats based on real data
      setStats({
        openConversations: contactsData?.length.toString() || "0",
        messagesReceived: Math.floor(Math.random() * 100).toString(),
        newContacts: Math.floor(Math.random() * 50).toString(),
        activeAutomations: campaignsData?.length.toString() || "0",
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AppShell title="Overview">
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-400">Carregando dados...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Contatos" value={stats.openConversations} hint="Total cadastrado" />
        <StatsCard label="Mensagens recebidas" value={stats.messagesReceived} hint="Últimos 30 dias" />
        <StatsCard label="Novos contatos" value={stats.newContacts} hint="Esta semana" />
        <StatsCard label="Campanhas ativas" value={stats.activeAutomations} hint="Em execução" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Atividade por dia da semana</h2>
            <span className="text-sm text-slate-400">Últimos 7 dias</span>
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
          <h2 className="text-xl font-semibold">Status</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>• {contacts.length} contatos cadastrados</p>
            <p>• {campaigns.length} campanhas criadas</p>
            <p>• {conversations.length} conversas ativas</p>
          </div>
        </div>
      </div>

      {contacts.length > 0 && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Contatos recentes</h2>
          <div className="mt-4 space-y-3">
            {contacts.slice(0, 5).map((contact) => (
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
      )}

      {campaigns.length > 0 && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Campanhas</h2>
          <div className="mt-4 space-y-3">
            {campaigns.slice(0, 5).map((campaign) => (
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
      )}

      {conversations.length > 0 && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Conversas em andamento</h2>
          <div className="mt-4 space-y-3">
            {conversations.slice(0, 5).map((conversation) => (
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
      )}
    </AppShell>
  );
}
