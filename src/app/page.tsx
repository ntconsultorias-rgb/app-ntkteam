export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center gap-8 px-6">
        {/* Logo / Marca */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter">N</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground uppercase">
            App <span className="text-primary">Neto</span>
          </h1>
          <p className="text-muted text-lg">Treino & Dieta</p>
        </div>

        {/* Paleta de cores */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-surface p-4 border border-border">
              <div className="w-10 h-10 rounded-lg bg-background border border-border" />
              <div>
                <p className="text-sm font-semibold text-foreground">Background</p>
                <p className="text-xs text-muted">#0A0A0A</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface p-4 border border-border">
              <div className="w-10 h-10 rounded-lg bg-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">Texto</p>
                <p className="text-xs text-muted">#F5F5F5</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface p-4 border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Primary</p>
                <p className="text-xs text-muted">#E11D48</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface p-4 border border-border">
              <div className="w-10 h-10 rounded-lg bg-surface-light" />
              <div>
                <p className="text-sm font-semibold text-foreground">Surface</p>
                <p className="text-xs text-muted">#1E1E1E</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de exemplo */}
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">
            Componentes
          </h2>
          <button className="w-full h-14 rounded-xl bg-primary text-white text-lg font-bold uppercase tracking-wide hover:bg-primary-hover transition-colors">
            Começar Treino
          </button>
          <button className="w-full h-14 rounded-xl border border-border bg-surface text-foreground text-lg font-bold uppercase tracking-wide hover:bg-surface-light transition-colors">
            Ver Dieta
          </button>
          <button className="w-full h-14 rounded-xl border border-primary text-primary text-lg font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-colors">
            Meu Perfil
          </button>
        </div>

        {/* Tipografia */}
        <div className="w-full flex flex-col gap-3 pb-10">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">
            Tipografia — Rajdhani
          </h2>
          <div className="rounded-xl bg-surface border border-border p-5 flex flex-col gap-2">
            <p className="text-3xl font-bold text-foreground uppercase">Heading Bold</p>
            <p className="text-2xl font-semibold text-foreground">Heading Semibold</p>
            <p className="text-xl font-medium text-foreground">Heading Medium</p>
            <p className="text-base font-normal text-muted">Corpo de texto regular — Rajdhani traz personalidade esportiva e moderna.</p>
            <p className="text-sm font-light text-muted">Texto auxiliar light</p>
          </div>
        </div>
      </main>
    </div>
  );
}
