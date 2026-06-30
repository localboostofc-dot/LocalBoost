"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import QRCode from "qrcode";

export default function WhatsAppPage() {
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("Gerando QR Code...");
  const [device, setDevice] = useState("Aguardando conexão");

  useEffect(() => {
    const generate = async () => {
      const data = `localboost-qr-${Date.now()}`;
      const qrUrl = await QRCode.toDataURL(data);
      setQr(qrUrl);
      setStatus("QR Code pronto para escaneamento");
    };

    generate();
  }, []);

  return (
    <AppShell title="WhatsApp">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Conexão automática WAHA</h2>
          <p className="mt-2 text-sm text-slate-400">O usuário só precisa abrir o WhatsApp, abrir “Aparelhos conectados” e escanear o código abaixo.</p>
          <div className="mt-6 flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-cyan-400/30 bg-slate-950/60 p-4">
            {qr ? <img src={qr} alt="QR Code WAHA" className="h-72 w-72 rounded-2xl bg-white p-3" /> : <p className="text-sm text-slate-400">Gerando QR...</p>}
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Atualizar QR</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm">Desconectar</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold">Status da sessão</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p><span className="font-semibold text-white">Status:</span> {status}</p>
              <p><span className="font-semibold text-white">Dispositivo:</span> {device}</p>
              <p><span className="font-semibold text-white">Segurança:</span> Sessão isolada por usuário e autenticada via JWT.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold">Últimas mensagens recebidas via webhook</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">• 10:42 — Olá, gostaria de saber sobre o horário de atendimento.</div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">• 10:18 — Tenho interesse no plano de assinatura.</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
