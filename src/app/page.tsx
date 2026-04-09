export default function StudentHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <main className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter">N</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground uppercase">
            Team <span className="text-primary">NTK</span>
          </h1>
          <p className="text-muted text-base">Treino & Dieta</p>
        </div>

        {/* Ações */}
        <div className="w-full flex flex-col gap-3">
          <button className="w-full h-14 rounded-xl bg-primary text-white text-lg font-bold uppercase tracking-wide hover:bg-primary-hover transition-colors">
            Acessar Meu Treino
          </button>
          <button className="w-full h-14 rounded-xl border border-border bg-surface text-foreground text-lg font-bold uppercase tracking-wide hover:bg-surface-light transition-colors">
            Ver Dieta
          </button>
        </div>

        <p className="text-xs text-muted text-center">
          Entre com o PIN fornecido pelo seu personal
        </p>
      </main>
    </div>
  );
}
