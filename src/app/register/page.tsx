import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
        <h1 className="mt-3 text-3xl font-semibold">Criar conta</h1>
        <p className="mt-3 text-sm text-slate-400">Comece com o plano free e teste por 7 dias tudo o que a plataforma oferece.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" placeholder="Nome da empresa" />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" placeholder="E-mail" />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" placeholder="Senha" type="password" />
          <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Criar conta</button>
        </div>
        <p className="mt-6 text-sm text-slate-400">Já tem conta? <Link href="/login" className="text-cyan-300">Entrar</Link></p>
      </div>
    </div>
  );
}
