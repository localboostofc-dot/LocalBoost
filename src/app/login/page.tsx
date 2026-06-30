import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">LocalBoost</p>
        <h1 className="mt-3 text-3xl font-semibold">Entrar na plataforma</h1>
        <p className="mt-3 text-sm text-slate-400">Acesse seu painel com autenticação segura e 2FA opcional.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" placeholder="E-mail" />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" placeholder="Senha" type="password" />
          <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Entrar</button>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <Link href="/register" className="text-cyan-300">Criar conta</Link>
          <span>Esqueci minha senha</span>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
          <p>Login social com Google e verificação por e-mail estão prontos para integração com Supabase/Auth.</p>
        </div>
      </div>
    </div>
  );
}
