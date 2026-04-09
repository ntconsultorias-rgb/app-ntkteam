import Calendar from "@/components/admin/Calendar";
import DashboardTabs from "@/components/admin/DashboardTabs";

const statCards = [
  { label: "Atualizações planejadas para hoje", value: 0, icon: <CalendarIcon />, color: "text-green-500" },
  { label: "Atualizaram hoje", value: 0, icon: <CheckIcon />, color: "text-green-500" },
  { label: "Vencimentos hoje", value: 0, icon: <WarnIcon />, color: "text-red-500" },
  { label: "Vencimentos próximos 7 dias", value: 0, icon: <WarnIcon />, color: "text-yellow-500" },
  { label: "Alunos ativos", value: 0, icon: <UserIcon />, color: "text-blue-500" },
  { label: "Alunos vencidos", value: 0, icon: <UserIcon />, color: "text-muted" },
];

const statCards2 = [
  { label: "Sem vigência", value: 0, icon: <WarnIcon />, color: "text-yellow-500" },
  { label: "Aniversariantes hoje", value: 0, icon: <GiftIcon />, color: "text-purple-500" },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Título */}
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
      </div>

      {/* Linha 1 — 6 cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Linha 2 — 2 cards */}
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        {statCards2.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Calendário */}
      <Calendar />

      {/* Tabs de alunos */}
      <DashboardTabs />
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
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-surface border border-border p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow cursor-pointer">
      <p className="text-sm text-muted leading-snug">{label}</p>
      <div className="flex items-center gap-2">
        <span className={color}>{icon}</span>
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
