export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight">
          Dashboard
        </h2>
        <p className="text-muted mt-1">Visão geral dos seus alunos e treinos</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Alunos ativos" value="0" />
        <StatCard label="Treinos criados" value="0" />
        <StatCard label="Dietas criadas" value="0" />
      </div>

      {/* Placeholder de conteúdo futuro */}
      <div className="rounded-xl border border-border bg-surface p-8 flex flex-col items-center justify-center gap-3 text-center min-h-64">
        <div className="w-12 h-12 rounded-xl bg-surface-light border border-border flex items-center justify-center">
          <span className="text-xl text-muted">📋</span>
        </div>
        <p className="font-semibold text-foreground">Nenhum aluno cadastrado ainda</p>
        <p className="text-sm text-muted">Comece adicionando seu primeiro aluno</p>
        <button className="mt-2 px-6 h-10 rounded-lg bg-primary text-white text-sm font-bold uppercase tracking-wide hover:bg-primary-hover transition-colors">
          Adicionar Aluno
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface border border-border p-6 flex flex-col gap-1">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}
