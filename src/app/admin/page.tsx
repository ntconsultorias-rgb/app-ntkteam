import Calendar from "@/components/admin/Calendar";

const statCards = [
  {
    label: "Atualizações planejadas hoje",
    value: 0,
    icon: "📋",
    color: "text-blue-400",
  },
  {
    label: "Atualizaram hoje",
    value: 0,
    icon: "✅",
    color: "text-green-400",
  },
  {
    label: "Vencimentos hoje",
    value: 0,
    icon: "⚠️",
    color: "text-red-400",
  },
  {
    label: "Vencimentos próximos 7 dias",
    value: 0,
    icon: "⚠️",
    color: "text-yellow-400",
  },
  {
    label: "Alunos ativos",
    value: 0,
    icon: "👤",
    color: "text-blue-400",
  },
  {
    label: "Alunos vencidos",
    value: 0,
    icon: "👤",
    color: "text-muted",
  },
  {
    label: "Sem vigência",
    value: 0,
    icon: "⚠️",
    color: "text-yellow-400",
  },
  {
    label: "Aniversariantes hoje",
    value: 0,
    icon: "🎁",
    color: "text-purple-400",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      {/* Título */}
      <div className="flex items-center gap-3">
        <span className="text-xl text-muted">📅</span>
        <h1 className="text-2xl font-bold text-foreground uppercase tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.slice(0, 6).map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 max-w-2xl">
        {statCards.slice(6).map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Calendário */}
      <Calendar />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-surface border border-border p-5 flex flex-col gap-3 hover:border-border/80 transition-colors cursor-pointer">
      <p className="text-sm text-muted leading-snug">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
    </div>
  );
}
