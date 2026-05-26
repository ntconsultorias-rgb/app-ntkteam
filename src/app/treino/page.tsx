"use client";

import Link from "next/link";

const treinos = [
  {
    id: "upper-1",
    nome: "Upper 1",
    descricao: "Peito, costas, ombros e braços",
    series: 14,
    cor: "#7f1d1d",
    imagem: "/treinos/upper-1.jpg",
  },
  {
    id: "lower-2",
    nome: "Lower 2",
    descricao: "Quadríceps, posterior e glúteo",
    series: 11,
    cor: "#1e3a8a",
    imagem: "/treinos/lower-2.jpg",
  },
  {
    id: "lower-3",
    nome: "Lower 3",
    descricao: "Glúteo, abdutora e panturrilha",
    series: 9,
    cor: "#78350f",
    imagem: "/treinos/lower-3.jpg",
  },
];

export default function SelecionarTreino() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold text-white uppercase tracking-wide">
          Meus Treinos
        </h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* Cards de treino */}
      <div className="flex-1 px-4 pb-8 flex flex-col gap-4">
        {treinos.map((treino) => (
          <Link
            key={treino.id}
            href={`/treino/${treino.id}`}
            className="relative rounded-2xl overflow-hidden min-h-48 flex flex-col justify-between p-5 active:scale-95 transition-transform"
            style={{ backgroundColor: treino.cor }}
          >
            {/* Imagem de fundo */}
            {treino.imagem && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${treino.imagem})` }}
              />
            )}

            {/* Overlay gradiente para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Conteúdo */}
            <div className="relative z-10 flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-white/90 text-xs font-semibold uppercase tracking-widest">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                {treino.series} séries válidas
              </span>
            </div>

            {/* Nome e descrição */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight drop-shadow-lg">
                {treino.nome}
              </h2>
              <p className="text-white/70 text-sm mt-0.5">{treino.descricao}</p>

              {/* Botão iniciar */}
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-white text-sm font-bold">Iniciar treino</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 flex items-center justify-around px-6 py-3 pb-6">
        <NavBtn icon="home" label="Início" href="/" />
        <NavBtn icon="dumbbell" label="Treino" href="/treino" active />
        <NavBtn icon="food" label="Dieta" href="/dieta" />
        <NavBtn icon="clock" label="Histórico" href="#" />
        <NavBtn icon="user" label="Perfil" href="#" />
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href: string }) {
  const color = active ? "#f97316" : "#6b7280";
  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      {icon === "home" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )}
      {icon === "dumbbell" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16M18 4v16M3 8h3m12 0h3M3 16h3m12 0h3M9 4h6v16H9z" />
        </svg>
      )}
      {icon === "food" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )}
      {icon === "clock" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {icon === "user" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      )}
      <span className="text-[10px] font-medium" style={{ color }}>{label}</span>
    </Link>
  );
}
