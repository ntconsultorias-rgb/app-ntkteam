import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Team NTK",
  description: "Painel do personal trainer",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="font-bold text-foreground uppercase tracking-wide">
              Team <span className="text-primary">NTK</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <NavItem label="Dashboard" active />
          <NavItem label="Alunos" />
          <NavItem label="Treinos" />
          <NavItem label="Dietas" />
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-surface-light border border-border" />
            <div>
              <p className="text-sm font-semibold text-foreground">Personal</p>
              <p className="text-xs text-muted">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 flex flex-col overflow-auto">
        <header className="h-16 border-b border-border flex items-center px-8">
          <h1 className="text-lg font-semibold text-foreground">Painel Admin</h1>
        </header>
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-muted hover:bg-surface-light hover:text-foreground"
      }`}
    >
      {label}
    </div>
  );
}
