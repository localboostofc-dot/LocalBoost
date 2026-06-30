"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const normalizePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 10 || digits.length === 11) {
      return `55${digits}`;
    }
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
      return digits;
    }
    return null;
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!companyName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Digite um e-mail válido.");
      setLoading(false);
      return;
    }

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      setError("Digite um telefone válido no formato +55 XX XXXXX-XXXX ou 55XXXXXXXXXXX");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    const result = await signUp({ email: email.trim().toLowerCase(), password, phone: normalizedPhone, companyName });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
        <h1 className="mt-3 text-3xl font-semibold">Criar conta</h1>
        <p className="mt-3 text-sm text-slate-400">
          Comece com o plano free e teste por 7 dias tudo o que a plataforma oferece.
        </p>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
            Conta criada com sucesso! Redirecionando para o painel...
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-3">
          <input
            type="text"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
            placeholder="Nome da empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Já tem conta?{" "}
          <Link href="/login" className="text-cyan-300">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
