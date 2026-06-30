"use client";

import { useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { initialKnowledgeBase } from "@/lib/constants";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("A IA está pronta para responder.");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context: initialKnowledgeBase }),
    });
    const data = await res.json();
    setReply(data.reply || "Nenhuma resposta recebida.");
    setLoading(false);
  };

  return (
    <AppShell title="IA">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Assistente IA LocalBoost</h2>
          <p className="mt-2 text-sm text-slate-400">A IA conversa em português, usa a base de conhecimento do negócio, qualifica leads e ajuda no atendimento humano.</p>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">Cliente: {message || "Olá, vocês atendem hoje?"}</div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-200">IA: {reply}</div>
          </div>
          <div className="mt-4 space-y-3">
            <textarea className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3" placeholder="Digite uma pergunta para a IA" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950" disabled={loading}>{loading ? "Pensando..." : "Enviar para a IA"}</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold">Base de conhecimento</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {initialKnowledgeBase.map((item) => <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">{item}</li>)}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
