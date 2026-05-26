"use client";

import { useState } from "react";
import Link from "next/link";

const macros = {
  calorias: { consumido: 1240, total: 2100, cor: "#f97316" },
  proteinas: { consumido: 95, total: 160, unidade: "g", cor: "#ef4444" },
  carboidratos: { consumido: 130, total: 240, unidade: "g", cor: "#f59e0b" },
  gorduras: { consumido: 38, total: 65, unidade: "g", cor: "#3b82f6" },
};

const refeicoes = [
  {
    id: 1,
    nome: "Café da manhã",
    horario: "07:00",
    kcal: 480,
    alimentos: [
      { id: 1, nome: "Ovos mexidos", qtd: "3 unidades", kcal: 210, feito: false },
      { id: 2, nome: "Pão integral", qtd: "2 fatias (60g)", kcal: 140, feito: false },
      { id: 3, nome: "Banana", qtd: "1 unidade (100g)", kcal: 90, feito: false },
      { id: 4, nome: "Café preto", qtd: "200ml", kcal: 5, feito: false },
    ],
  },
  {
    id: 2,
    nome: "Lanche da manhã",
    horario: "10:00",
    kcal: 220,
    alimentos: [
      { id: 1, nome: "Whey protein", qtd: "30g (1 scoop)", kcal: 120, feito: false },
      { id: 2, nome: "Maçã", qtd: "1 unidade (130g)", kcal: 75, feito: false },
    ],
  },
  {
    id: 3,
    nome: "Almoço",
    horario: "12:30",
    kcal: 680,
    alimentos: [
      { id: 1, nome: "Arroz branco", qtd: "4 colheres (120g)", kcal: 160, feito: false },
      { id: 2, nome: "Feijão", qtd: "2 conchas (120g)", kcal: 130, feito: false },
      { id: 3, nome: "Frango grelhado", qtd: "150g", kcal: 240, feito: false },
      { id: 4, nome: "Salada verde", qtd: "à vontade", kcal: 30, feito: false },
      { id: 5, nome: "Azeite", qtd: "1 colher (10ml)", kcal: 90, feito: false },
    ],
  },
  {
    id: 4,
    nome: "Lanche da tarde",
    horario: "16:00",
    kcal: 310,
    alimentos: [
      { id: 1, nome: "Iogurte grego", qtd: "170g", kcal: 130, feito: false },
      { id: 2, nome: "Granola", qtd: "30g", kcal: 130, feito: false },
      { id: 3, nome: "Morango", qtd: "100g", kcal: 30, feito: false },
    ],
  },
];

type Alimento = { id: number; nome: string; qtd: string; kcal: number; feito: boolean };

function CirculoMacro({
  label,
  consumido,
  total,
  unidade,
  cor,
}: {
  label: string;
  consumido: number;
  total: number;
  unidade?: string;
  cor: string;
}) {
  const pct = Math.min((consumido / total) * 100, 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle
            cx="32" cy="32" r={r}
            fill="none"
            stroke={cor}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-xs font-bold leading-none">{consumido}</span>
          {unidade && <span className="text-white/40 text-[9px]">{unidade}</span>}
        </div>
      </div>
      <span className="text-white/50 text-[10px] text-center leading-tight">{label}</span>
      <span className="text-white/30 text-[9px]">{total}{unidade ?? " kcal"}</span>
    </div>
  );
}

export default function DietaPage() {
  const [refeicaoState, setRefeicaoState] = useState<Record<number, Alimento[]>>(
    Object.fromEntries(refeicoes.map((r) => [r.id, r.alimentos.map((a) => ({ ...a }))]))
  );
  const [expandido, setExpandido] = useState<number | null>(1);

  const toggleFeito = (refId: number, alimId: number) => {
    setRefeicaoState((prev) => ({
      ...prev,
      [refId]: prev[refId].map((a) => (a.id === alimId ? { ...a, feito: !a.feito } : a)),
    }));
  };

  const totalFeitos = Object.values(refeicaoState).flat().filter((a) => a.feito).length;
  const totalAlimentos = Object.values(refeicaoState).flat().length;
  const kcalConsumidas = Object.values(refeicaoState)
    .flat()
    .filter((a) => a.feito)
    .reduce((acc, a) => acc + a.kcal, 0);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 sticky top-0 bg-[#0f0f0f] z-10">
        <h1 className="text-xl font-bold text-white uppercase tracking-wide">Minha Dieta</h1>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">{new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })}</span>
        </div>
      </div>

      {/* Macros */}
      <div className="mx-4 bg-[#1a1a1a] rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide">Calorias restantes</p>
            <p className="text-white text-2xl font-bold">{macros.calorias.total - kcalConsumidas} <span className="text-white/40 text-sm font-normal">kcal</span></p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs">Consumido</p>
            <p className="text-orange-400 font-bold text-base">{kcalConsumidas} kcal</p>
          </div>
        </div>

        {/* Barra de progresso geral */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-orange-500 rounded-full transition-all"
            style={{ width: `${Math.min((kcalConsumidas / macros.calorias.total) * 100, 100)}%` }}
          />
        </div>

        {/* Círculos */}
        <div className="flex items-center justify-around">
          <CirculoMacro label="Proteínas" consumido={macros.proteinas.consumido} total={macros.proteinas.total} unidade="g" cor={macros.proteinas.cor} />
          <CirculoMacro label="Carboidratos" consumido={macros.carboidratos.consumido} total={macros.carboidratos.total} unidade="g" cor={macros.carboidratos.cor} />
          <CirculoMacro label="Gorduras" consumido={macros.gorduras.consumido} total={macros.gorduras.total} unidade="g" cor={macros.gorduras.cor} />
        </div>
      </div>

      {/* Refeições */}
      <div className="flex flex-col gap-3 px-4">
        {refeicoes.map((ref) => {
          const alimentos = refeicaoState[ref.id];
          const feitosNessa = alimentos.filter((a) => a.feito).length;
          const aberto = expandido === ref.id;
          const completa = feitosNessa === alimentos.length;

          return (
            <div key={ref.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-4"
                onClick={() => setExpandido(aberto ? null : ref.id)}
              >
                {/* Ícone */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${completa ? "bg-green-500/20" : "bg-[#2a2a2a]"}`}>
                  {completa ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-sm">{ref.nome}</h3>
                    <span className="text-white/30 text-xs">{ref.horario}</span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{ref.kcal} kcal · {feitosNessa}/{alimentos.length} alimentos</p>
                </div>

                {/* Mini progress */}
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(feitosNessa / alimentos.length) * 100}%` }} />
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 transition-transform opacity-40 ${aberto ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {aberto && (
                <div className="px-4 pb-4">
                  <div className="flex flex-col gap-1">
                    {alimentos.map((alim) => (
                      <button
                        key={alim.id}
                        onClick={() => toggleFeito(ref.id, alim.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${alim.feito ? "bg-green-500/10" : "bg-[#242424]"}`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${alim.feito ? "bg-green-500 border-green-500" : "border-white/20"}`}>
                          {alim.feito && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${alim.feito ? "text-white/50 line-through" : "text-white"}`}>{alim.nome}</p>
                          <p className="text-white/30 text-xs">{alim.qtd}</p>
                        </div>
                        <span className="text-white/40 text-xs shrink-0">{alim.kcal} kcal</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 flex items-center justify-around px-6 py-3 pb-6">
        <NavBtn icon="home" label="Início" href="/" />
        <NavBtn icon="dumbbell" label="Treino" href="/treino" />
        <NavBtn icon="food" label="Dieta" href="/dieta" active />
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
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
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
