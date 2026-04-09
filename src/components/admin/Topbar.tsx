export default function Topbar() {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 shrink-0">
      <div />

      <div className="flex items-center gap-4">
        {/* Notificações */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-light transition-colors text-muted hover:text-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-border" />

        {/* Usuário */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground leading-none">Benedito Luiz</p>
            <p className="text-xs text-muted mt-0.5">Personal Trainer</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">B</span>
          </div>
        </div>
      </div>
    </header>
  );
}
