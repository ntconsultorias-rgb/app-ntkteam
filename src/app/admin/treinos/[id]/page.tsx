"use client";

import { useState } from "react";
import Link from "next/link";

const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const treinosData = [
  {
    id: "lower-a",
    nome: "LOWER A (Posterior e Glúteo)",
    exercicios: [
      { id: 1, nome: "Mesa flexora", grupo: "Posterior de coxa - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
      { id: 2, nome: "Stiff com Halter", grupo: "Posterior de coxa - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
      { id: 3, nome: "Cadeira flexora", grupo: "Posterior de coxa - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
      { id: 4, nome: "Elevação Pélvica na Máquina", grupo: "Glúteo máximo - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
      { id: 5, nome: "Cadeira Abdutora 90 graus", grupo: "Glúteo médio - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
      { id: 6, nome: "Panturrilha sentado", grupo: "Panturrilha - 1", prep: 2, validas: 2, reps: "10-12, 6-8 reps", intervalo: 60 },
    ],
    volume: [
      { grupo: "Posterior de coxa", vol: 4.0 }, { grupo: "Glúteo máximo", vol: 4.0 },
      { grupo: "Glúteo médio", vol: 2.0 }, { grupo: "Panturrilha", vol: 2.0 },
    ],
  },
  { id: "upper-a", nome: "UPPER A (Costas + Ombros)", exercicios: [], volume: [] },
  { id: "lower-b", nome: "LOWER B (Quads e Glúteo)", exercicios: [], volume: [] },
  { id: "upper-b", nome: "UPPER B (Costas + Ombros + Braços)", exercicios: [], volume: [] },
  { id: "lower-c", nome: "LOWER C (Posterior + Glúteo)", exercicios: [], volume: [] },
];

const volumeTotal = [
  { grupo: "Glúteo máximo", vol: 16.0 }, { grupo: "Abdômen", vol: 8.0 },
  { grupo: "Quadríceps", vol: 8.0 }, { grupo: "Latíssimo", vol: 7.0 },
  { grupo: "Posterior de coxa", vol: 4.0 }, { grupo: "Glúteo médio", vol: 4.0 },
  { grupo: "Upper back", vol: 4.0 }, { grupo: "Deltóide", vol: 4.0 },
  { grupo: "Tríceps", vol: 4.0 }, { grupo: "Deltóide lateral", vol: 3.0 },
  { grupo: "Panturrilha", vol: 2.0 }, { grupo: "Deltóide posterior", vol: 2.0 },
  { grupo: "Deltóide anterior", vol: 2.0 }, { grupo: "Bíceps", vol: 2.0 },
  { grupo: "Peito", vol: 2.0 },
];

type Exercicio = { id: number; nome: string; grupo: string; prep: number; validas: number; reps: string; intervalo: number };

export default function TreinoEditorPage() {
  const [activeTab, setActiveTab] = useState("lower-a");
  const [editingNome, setEditingNome] = useState(false);
  const [nomeFicha, setNomeFicha] = useState("Mesociclo 1 Base");
  const [modalExercicio, setModalExercicio] = useState<Exercicio | null>(null);
  const [periodoCardio, setPeriodoCardio] = useState<"semanal" | "diario">("diario");
  const [unidadeTempo, setUnidadeTempo] = useState<"minutos" | "horas">("minutos");
  const [diasAtivos, setDiasAtivos] = useState([true, true, true, true, true, true, false]);
  const [tempoIndividual, setTempoIndividual] = useState(true);
  const [tempos, setTempos] = useState(["30", "30", "30", "30", "30", "60", ""]);

  const treino = treinosData.find((t) => t.id === activeTab) ?? treinosData[0];

  const totalMin = tempos.reduce((acc, t) => acc + (parseInt(t) || 0), 0);
  const toHHMM = (min: number) => {
    const h = Math.floor(min / 60).toString().padStart(2, "0");
    const m = (min % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Breadcrumb */}
      <Link href="/admin/treinos" className="text-sm text-muted hover:text-primary transition-colors">
        ← Edição de ficha de treino
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            {editingNome ? (
              <input
                autoFocus
                value={nomeFicha}
                onChange={(e) => setNomeFicha(e.target.value)}
                onBlur={() => setEditingNome(false)}
                className="text-2xl font-bold text-foreground bg-transparent border-b border-primary focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-foreground">{nomeFicha}</h1>
            )}
            <button onClick={() => setEditingNome(true)} className="text-primary hover:text-primary-hover transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-muted mt-1">Última modificação em 03/04/2026 16:33</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Ativo
        </span>
      </div>

      {/* Importar treino pré-cadastrado */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <h2 className="font-semibold text-foreground text-sm">Importar treino pré-cadastrado</h2>
        </div>
        <p className="text-sm text-muted mb-3">Selecione um modelo de treino pré-cadastrado para importar:</p>
        <div className="flex gap-3">
          <select className="flex-1 h-10 px-3 rounded-lg border border-border bg-surface text-sm text-muted focus:outline-none focus:border-primary transition-colors">
            <option value="">Selecione um treino pré-cadastrado</option>
          </select>
          <button className="h-10 px-5 rounded-lg border border-border text-sm font-medium text-muted bg-surface-light cursor-not-allowed" disabled>
            Importar
          </button>
        </div>
      </div>

      {/* Informações do treino */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <h2 className="font-semibold text-foreground text-sm">Informações do treino</h2>
        </div>
        <label className="text-xs font-semibold text-red-500 mb-1 block">* Aluno</label>
        <select className="w-full max-w-xs h-10 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
          <option>Julia Miggiorini Crespo</option>
          <option>Glenda Oliveira Silva</option>
          <option>Piter Moreira Violim</option>
        </select>
      </div>

      {/* Treinos */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3">
          <h2 className="font-semibold text-foreground">Treinos</h2>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              Edição em massa
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Criar periodização semanal
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 h-8 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors">
              + Novo treino
            </button>
          </div>
        </div>

        {/* Tabs dos dias */}
        <div className="flex overflow-x-auto border-b border-border">
          {treinosData.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === t.id ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="6" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="4" cy="18" r="1.5" /><rect x="8" y="5" width="12" height="2" rx="1" /><rect x="8" y="11" width="12" height="2" rx="1" /><rect x="8" y="17" width="12" height="2" rx="1" /></svg>
              {t.nome}
            </button>
          ))}
        </div>

        {/* Lista de exercícios */}
        <div className="divide-y divide-border">
          {treino.exercicios.map((ex) => (
            <div
              key={ex.id}
              className="flex items-center justify-between px-5 py-3 hover:bg-surface-light transition-colors cursor-pointer"
              onClick={() => setModalExercicio(ex)}
            >
              <span className="text-sm font-medium text-foreground">{ex.nome}</span>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700">Prep.</span>
                <span className="text-xs text-muted">{ex.prep} séries</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">Válidas</span>
                <span className="text-xs text-muted">{ex.validas} séries</span>
                <span className="text-xs text-muted">{ex.reps}</span>
              </div>
            </div>
          ))}

          {treino.exercicios.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted">
              <p className="text-sm">Nenhum exercício neste treino</p>
            </div>
          )}
        </div>

        {/* Volume por grupamento */}
        {treino.volume.length > 0 && (
          <div className="px-5 py-4 border-t border-border">
            <p className="text-xs font-semibold text-muted mb-2">Volume por grupamento muscular</p>
            <div className="flex flex-wrap gap-2">
              {treino.volume.map((v) => (
                <span key={v.grupo} className="px-3 py-1 rounded-full bg-surface-light border border-border text-xs text-foreground">
                  {v.grupo}: {v.vol}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Volume total */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2 className="font-semibold text-foreground text-sm">Volume total da ficha por grupamento muscular</h2>
          <button className="ml-auto text-xs text-primary hover:underline flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Visualizar como gráfico
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {volumeTotal.map((v) => (
            <span key={v.grupo} className="px-3 py-1 rounded-full bg-surface-light border border-border text-xs text-foreground">
              {v.grupo}: {v.vol}
            </span>
          ))}
        </div>
      </div>

      {/* Cardio */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <h2 className="font-semibold text-foreground text-sm">Cardio</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Período */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Período</p>
            <div className="flex gap-4">
              {(["semanal", "diario"] as const).map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <div
                    onClick={() => setPeriodoCardio(p)}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${periodoCardio === p ? "border-primary" : "border-border"}`}
                  >
                    {periodoCardio === p && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  {p === "semanal" ? "Semanal" : "Diário"}
                </label>
              ))}
            </div>
          </div>

          {/* Unidade de tempo */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Unidade de tempo</p>
            <div className="flex gap-4">
              {(["minutos", "horas"] as const).map((u) => (
                <label key={u} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <div
                    onClick={() => setUnidadeTempo(u)}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${unidadeTempo === u ? "border-primary" : "border-border"}`}
                  >
                    {unidadeTempo === u && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  {u === "minutos" ? "Minutos" : "Horas"}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Dias da semana */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-foreground mb-3">Dias da semana</p>
          <div className="flex flex-wrap gap-2">
            {DIAS_SEMANA.map((dia, i) => (
              <button
                key={dia}
                onClick={() => setDiasAtivos((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  diasAtivos[i] ? "bg-primary text-white" : "bg-surface-light border border-border text-muted"
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        {/* Tempo por dia / mesmo tempo */}
        <div className="mt-6">
          <div className="flex gap-6 mb-4">
            {(["mesmo", "individual"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                <div
                  onClick={() => setTempoIndividual(opt === "individual")}
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${(opt === "individual") === tempoIndividual ? "border-primary" : "border-border"}`}
                >
                  {(opt === "individual") === tempoIndividual && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                {opt === "mesmo" ? "Mesmo tempo para todos os dias" : "Tempo individual por dia"}
              </label>
            ))}
          </div>

          <p className="text-sm font-semibold text-foreground mb-3">Tempo por dia ({unidadeTempo}):</p>
          <div className="flex flex-col gap-2 max-w-lg">
            {DIAS_SEMANA.map((dia, i) => (
              <div key={dia} className="flex items-center gap-4">
                <span className="text-sm text-foreground w-20">{dia}:</span>
                <input
                  type="number"
                  value={tempos[i]}
                  onChange={(e) => setTempos((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                  placeholder="Tempo"
                  disabled={!diasAtivos[i]}
                  className="flex-1 h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                />
                {tempos[i] && diasAtivos[i] && (
                  <span className="text-xs text-muted w-16">({toHHMM(parseInt(tempos[i]))})</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total semanal */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-surface-light border border-border">
          <span className="text-sm font-semibold text-foreground">Total semanal:</span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-bold">{totalMin}min</span>
            <span className="text-sm text-muted">({toHHMM(totalMin)})</span>
          </div>
        </div>
      </div>

      {/* Modal configurar exercício */}
      {modalExercicio && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-foreground text-lg">Configurar treino</h2>
              <button onClick={() => setModalExercicio(null)} className="text-muted hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Nome do treino */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Nome do treino</p>
                <input type="text" defaultValue={treino.nome} className="w-full h-10 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
              </div>

              {/* Exercício expandido */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-surface-light border-b border-border">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-muted cursor-grab"><circle cx="4" cy="6" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="4" cy="18" r="1.5" /><rect x="8" y="5" width="12" height="2" rx="1" /><rect x="8" y="11" width="12" height="2" rx="1" /><rect x="8" y="17" width="12" height="2" rx="1" /></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><polyline points="18 15 12 9 6 15" /></svg>
                  <span className="text-sm font-semibold text-foreground flex-1">{modalExercicio.nome}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Superset</span>
                    <div className="w-9 h-5 rounded-full bg-border relative">
                      <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                    <button className="text-red-400 hover:text-red-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-4">
                  {/* Exercício select */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">Exercício</p>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 px-3 rounded-lg border border-border bg-surface flex items-center gap-2">
                        <span className="text-sm text-foreground">{modalExercicio.nome}</span>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{modalExercicio.grupo}</span>
                      </div>
                      <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted hover:bg-surface-light transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M12 5v2m0 10v2M5 12H3m18 0h-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05" /></svg>
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Botões de série */}
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-1 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                      Série padrão
                    </button>
                    <button className="inline-flex items-center gap-1 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                      Série padrão c/ top set
                    </button>
                  </div>

                  {/* Séries */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Séries válidas
                      </p>
                      <input type="number" defaultValue={modalExercicio.validas} className="w-full h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Aquecimento
                      </p>
                      <input type="number" defaultValue={0} className="w-full h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Preparatórias
                      </p>
                      <input type="number" defaultValue={modalExercicio.prep} className="w-full h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>

                  {/* Repetições + Intervalo */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Repetições</p>
                      <div className="flex gap-2">
                        <input type="text" defaultValue="10-12" className="flex-1 h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                        <input type="text" defaultValue="6-8" className="flex-1 h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Intervalo</p>
                      <input type="number" defaultValue={modalExercicio.intervalo} className="w-full h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Observações</p>
                    <input type="text" placeholder="Observações sobre o exercício" className="w-full h-9 px-3 rounded-lg border border-border bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors" />
                  </div>

                  {/* Técnicas */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface-light border border-border">
                    <span className="text-sm font-semibold text-foreground">Técnicas</span>
                    <button className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                      Adicionar técnica
                    </button>
                  </div>
                </div>
              </div>

              {/* Outros exercícios colapsados */}
              {treino.exercicios.filter((e) => e.id !== modalExercicio.id).map((ex) => (
                <div key={ex.id} className="border border-border rounded-xl">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-muted cursor-grab"><circle cx="4" cy="6" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="4" cy="18" r="1.5" /><rect x="8" y="5" width="12" height="2" rx="1" /><rect x="8" y="11" width="12" height="2" rx="1" /><rect x="8" y="17" width="12" height="2" rx="1" /></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><polyline points="6 9 12 15 18 9" /></svg>
                    <span className="text-sm font-semibold text-foreground flex-1">{ex.nome}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">Superset</span>
                      <div className="w-9 h-5 rounded-full bg-border relative"><span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow" /></div>
                      <button className="text-red-400 hover:text-red-600 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Adicionar exercício */}
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Adicionar exercício
              </button>

              {/* Volume */}
              <div className="p-4 rounded-xl bg-surface-light border border-border">
                <p className="text-xs font-semibold text-foreground mb-2">Volume por grupamento muscular</p>
                <div className="flex flex-wrap gap-2">
                  {treino.volume.map((v) => (
                    <span key={v.grupo} className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-foreground">
                      {v.grupo}: {v.vol}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setModalExercicio(null)} className="px-5 h-10 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface-light transition-colors">
                Cancelar
              </button>
              <button onClick={() => setModalExercicio(null)} className="px-5 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
