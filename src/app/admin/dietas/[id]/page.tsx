"use client";

import { useState } from "react";

type Alimento = {
  id: number;
  nome: string;
  quantidade: string;
  unidade: string;
  kcal: number;
  prot: number;
  carb: number;
  gord: number;
};

type Refeicao = {
  id: number;
  nome: string;
  horario: string;
  alimentos: Alimento[];
};

const initialRefeicoes: Refeicao[] = [
  {
    id: 1,
    nome: "Café da manhã",
    horario: "07:00",
    alimentos: [
      { id: 1, nome: "Ovos mexidos", quantidade: "3", unidade: "unidades", kcal: 210, prot: 18, carb: 2, gord: 14 },
      { id: 2, nome: "Pão integral", quantidade: "60", unidade: "g", kcal: 140, prot: 5, carb: 26, gord: 2 },
      { id: 3, nome: "Banana", quantidade: "100", unidade: "g", kcal: 90, prot: 1, carb: 23, gord: 0 },
    ],
  },
  {
    id: 2,
    nome: "Lanche da manhã",
    horario: "10:00",
    alimentos: [
      { id: 1, nome: "Whey protein", quantidade: "30", unidade: "g", kcal: 120, prot: 24, carb: 3, gord: 2 },
      { id: 2, nome: "Maçã", quantidade: "130", unidade: "g", kcal: 75, prot: 0, carb: 20, gord: 0 },
    ],
  },
  {
    id: 3,
    nome: "Almoço",
    horario: "12:30",
    alimentos: [
      { id: 1, nome: "Arroz branco", quantidade: "120", unidade: "g", kcal: 160, prot: 3, carb: 35, gord: 0 },
      { id: 2, nome: "Feijão", quantidade: "120", unidade: "g", kcal: 130, prot: 8, carb: 22, gord: 1 },
      { id: 3, nome: "Frango grelhado", quantidade: "150", unidade: "g", kcal: 240, prot: 45, carb: 0, gord: 5 },
      { id: 4, nome: "Azeite", quantidade: "10", unidade: "ml", kcal: 90, prot: 0, carb: 0, gord: 10 },
    ],
  },
  {
    id: 4,
    nome: "Lanche da tarde",
    horario: "16:00",
    alimentos: [
      { id: 1, nome: "Iogurte grego", quantidade: "170", unidade: "g", kcal: 130, prot: 17, carb: 6, gord: 4 },
      { id: 2, nome: "Granola", quantidade: "30", unidade: "g", kcal: 130, prot: 3, carb: 22, gord: 4 },
    ],
  },
  {
    id: 5,
    nome: "Jantar",
    horario: "19:30",
    alimentos: [
      { id: 1, nome: "Salmão grelhado", quantidade: "150", unidade: "g", kcal: 280, prot: 35, carb: 0, gord: 15 },
      { id: 2, nome: "Batata doce", quantidade: "150", unidade: "g", kcal: 130, prot: 2, carb: 30, gord: 0 },
      { id: 3, nome: "Brócolis", quantidade: "100", unidade: "g", kcal: 35, prot: 3, carb: 7, gord: 0 },
    ],
  },
];

const alunos = [
  { id: 35991, nome: "Julia Miggiorini Crespo" },
  { id: 35562, nome: "Piter Moreira Violim" },
  { id: 35373, nome: "Glenda Oliveira Silva" },
];

function calcTotais(refeicoes: Refeicao[]) {
  const all = refeicoes.flatMap((r) => r.alimentos);
  return {
    kcal: all.reduce((a, x) => a + x.kcal, 0),
    prot: all.reduce((a, x) => a + x.prot, 0),
    carb: all.reduce((a, x) => a + x.carb, 0),
    gord: all.reduce((a, x) => a + x.gord, 0),
  };
}

export default function DietaEditorPage() {
  const [nome, setNome] = useState("Dieta Hipertrofia Base");
  const [alunoId, setAlunoId] = useState(35991);
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>(initialRefeicoes);
  const [expandido, setExpandido] = useState<number | null>(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [refSelecionada, setRefSelecionada] = useState<number | null>(null);
  const [novoAlimento, setNovoAlimento] = useState<Partial<Alimento>>({});
  const [observacoes, setObservacoes] = useState("");

  const totais = calcTotais(refeicoes);

  const abrirModal = (refId: number) => {
    setRefSelecionada(refId);
    setNovoAlimento({});
    setModalAberto(true);
  };

  const adicionarAlimento = () => {
    if (!refSelecionada || !novoAlimento.nome) return;
    setRefeicoes((prev) =>
      prev.map((r) =>
        r.id === refSelecionada
          ? {
              ...r,
              alimentos: [
                ...r.alimentos,
                {
                  id: Date.now(),
                  nome: novoAlimento.nome ?? "",
                  quantidade: novoAlimento.quantidade ?? "100",
                  unidade: novoAlimento.unidade ?? "g",
                  kcal: novoAlimento.kcal ?? 0,
                  prot: novoAlimento.prot ?? 0,
                  carb: novoAlimento.carb ?? 0,
                  gord: novoAlimento.gord ?? 0,
                },
              ],
            }
          : r
      )
    );
    setModalAberto(false);
  };

  const removerAlimento = (refId: number, alimId: number) => {
    setRefeicoes((prev) =>
      prev.map((r) =>
        r.id === refId ? { ...r, alimentos: r.alimentos.filter((a) => a.id !== alimId) } : r
      )
    );
  };

  const atualizarHorario = (refId: number, horario: string) => {
    setRefeicoes((prev) => prev.map((r) => (r.id === refId ? { ...r, horario } : r)));
  };

  const atualizarNomeRef = (refId: number, nome: string) => {
    setRefeicoes((prev) => prev.map((r) => (r.id === refId ? { ...r, nome } : r)));
  };

  const adicionarRefeicao = () => {
    const newId = Math.max(...refeicoes.map((r) => r.id)) + 1;
    setRefeicoes((prev) => [
      ...prev,
      { id: newId, nome: `Refeição ${newId}`, horario: "08:00", alimentos: [] },
    ]);
    setExpandido(newId);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="text-2xl font-bold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors pb-0.5"
          />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Ativo</span>
            <span className="text-muted text-xs">Modificado hoje às 14:32</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-lg border border-border text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors">
            Exportar PDF
          </button>
          <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
            Salvar
          </button>
        </div>
      </div>

      {/* Aluno */}
      <div className="bg-surface border border-border rounded-xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold">J</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted mb-1">Aluno vinculado</p>
          <select
            value={alunoId}
            onChange={(e) => setAlunoId(Number(e.target.value))}
            className="text-sm font-medium text-foreground bg-transparent focus:outline-none cursor-pointer"
          >
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Totais de macros */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-sm font-bold text-foreground mb-4">Totais diários</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Calorias", valor: totais.kcal, unidade: "kcal", cor: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
            { label: "Proteínas", valor: totais.prot, unidade: "g", cor: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
            { label: "Carboidratos", valor: totais.carb, unidade: "g", cor: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
            { label: "Gorduras", valor: totais.gord, unidade: "g", cor: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
          ].map((m) => (
            <div key={m.label} className={`${m.bg} border ${m.border} rounded-xl p-4 flex flex-col gap-1`}>
              <p className="text-xs text-muted">{m.label}</p>
              <p className={`text-2xl font-bold ${m.cor}`}>{m.valor}</p>
              <p className="text-xs text-muted">{m.unidade}</p>
            </div>
          ))}
        </div>

        {/* Barras de macro */}
        <div className="mt-4 flex gap-1 h-3 rounded-full overflow-hidden">
          {totais.kcal > 0 && (
            <>
              <div className="bg-red-400 rounded-l-full" style={{ width: `${(totais.prot * 4 / totais.kcal) * 100}%` }} title="Proteínas" />
              <div className="bg-amber-400" style={{ width: `${(totais.carb * 4 / totais.kcal) * 100}%` }} title="Carboidratos" />
              <div className="bg-blue-400 rounded-r-full flex-1" title="Gorduras" />
            </>
          )}
        </div>
        <div className="flex gap-4 mt-2">
          {[
            { label: "Prot", pct: totais.kcal > 0 ? Math.round((totais.prot * 4 / totais.kcal) * 100) : 0, cor: "bg-red-400" },
            { label: "Carb", pct: totais.kcal > 0 ? Math.round((totais.carb * 4 / totais.kcal) * 100) : 0, cor: "bg-amber-400" },
            { label: "Gord", pct: totais.kcal > 0 ? Math.round((totais.gord * 9 / totais.kcal) * 100) : 0, cor: "bg-blue-400" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${m.cor}`} />
              <span className="text-xs text-muted">{m.label} {m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Refeições */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Refeições</h2>
          <button
            onClick={adicionarRefeicao}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar refeição
          </button>
        </div>

        {refeicoes.map((ref) => {
          const aberto = expandido === ref.id;
          const refTotais = ref.alimentos.reduce(
            (acc, a) => ({ kcal: acc.kcal + a.kcal, prot: acc.prot + a.prot, carb: acc.carb + a.carb, gord: acc.gord + a.gord }),
            { kcal: 0, prot: 0, carb: 0, gord: 0 }
          );

          return (
            <div key={ref.id} className="bg-surface border border-border rounded-xl overflow-hidden">
              {/* Cabeçalho da refeição */}
              <button
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface-light transition-colors"
                onClick={() => setExpandido(aberto ? null : ref.id)}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-foreground text-sm">{ref.nome}</p>
                  <p className="text-muted text-xs">{ref.horario} · {ref.alimentos.length} alimentos · {refTotais.kcal} kcal</p>
                </div>
                <div className="hidden md:flex items-center gap-4 mr-4">
                  <span className="text-xs text-muted">P: <strong className="text-foreground">{refTotais.prot}g</strong></span>
                  <span className="text-xs text-muted">C: <strong className="text-foreground">{refTotais.carb}g</strong></span>
                  <span className="text-xs text-muted">G: <strong className="text-foreground">{refTotais.gord}g</strong></span>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`shrink-0 text-muted transition-transform ${aberto ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Conteúdo expandido */}
              {aberto && (
                <div className="border-t border-border px-5 py-4 flex flex-col gap-4">
                  {/* Editar nome e horário */}
                  <div className="flex gap-3 flex-wrap">
                    <div className="flex-1 min-w-40">
                      <label className="text-xs text-muted mb-1 block">Nome da refeição</label>
                      <input
                        value={ref.nome}
                        onChange={(e) => atualizarNomeRef(ref.id, e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-border bg-surface-light text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-xs text-muted mb-1 block">Horário</label>
                      <input
                        type="time"
                        value={ref.horario}
                        onChange={(e) => atualizarHorario(ref.id, e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-border bg-surface-light text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tabela de alimentos */}
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface-light border-b border-border">
                          <th className="text-left px-4 py-2 text-muted font-semibold text-xs">Alimento</th>
                          <th className="text-left px-4 py-2 text-muted font-semibold text-xs">Qtd</th>
                          <th className="text-center px-4 py-2 text-muted font-semibold text-xs">Kcal</th>
                          <th className="text-center px-4 py-2 text-muted font-semibold text-xs">Prot</th>
                          <th className="text-center px-4 py-2 text-muted font-semibold text-xs">Carb</th>
                          <th className="text-center px-4 py-2 text-muted font-semibold text-xs">Gord</th>
                          <th className="px-4 py-2" />
                        </tr>
                      </thead>
                      <tbody>
                        {ref.alimentos.map((alim) => (
                          <tr key={alim.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                            <td className="px-4 py-2.5 text-foreground font-medium">{alim.nome}</td>
                            <td className="px-4 py-2.5 text-muted">{alim.quantidade} {alim.unidade}</td>
                            <td className="px-4 py-2.5 text-center text-orange-500 font-bold">{alim.kcal}</td>
                            <td className="px-4 py-2.5 text-center text-muted">{alim.prot}g</td>
                            <td className="px-4 py-2.5 text-center text-muted">{alim.carb}g</td>
                            <td className="px-4 py-2.5 text-center text-muted">{alim.gord}g</td>
                            <td className="px-4 py-2.5 text-right">
                              <button
                                onClick={() => removerAlimento(ref.id, alim.id)}
                                className="text-muted hover:text-red-500 transition-colors"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => abrirModal(ref.id)}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover font-medium transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Adicionar alimento
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Observações */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-sm font-bold text-foreground mb-3">Observações e orientações</h2>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Ex: Beber pelo menos 3L de água por dia. Evitar frituras. Suplementar com vitamina D..."
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface-light text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Modal adicionar alimento */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalAberto(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-6 w-full max-w-md mx-4 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-base">Adicionar alimento</h3>
              <button onClick={() => setModalAberto(false)} className="text-muted hover:text-foreground transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-muted mb-1 block">Nome do alimento *</label>
                <input
                  placeholder="Ex: Peito de frango"
                  value={novoAlimento.nome ?? ""}
                  onChange={(e) => setNovoAlimento((p) => ({ ...p, nome: e.target.value }))}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-surface-light text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted mb-1 block">Quantidade</label>
                  <input
                    placeholder="100"
                    value={novoAlimento.quantidade ?? ""}
                    onChange={(e) => setNovoAlimento((p) => ({ ...p, quantidade: e.target.value }))}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-surface-light text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Unidade</label>
                  <select
                    value={novoAlimento.unidade ?? "g"}
                    onChange={(e) => setNovoAlimento((p) => ({ ...p, unidade: e.target.value }))}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-surface-light text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option>g</option>
                    <option>ml</option>
                    <option>unidades</option>
                    <option>colheres</option>
                    <option>xícaras</option>
                    <option>fatias</option>
                    <option>conchas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(["kcal", "prot", "carb", "gord"] as const).map((campo) => (
                  <div key={campo}>
                    <label className="text-xs text-muted mb-1 block capitalize">{campo === "kcal" ? "Kcal" : campo === "prot" ? "Prot (g)" : campo === "carb" ? "Carb (g)" : "Gord (g)"}</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={novoAlimento[campo] ?? ""}
                      onChange={(e) => setNovoAlimento((p) => ({ ...p, [campo]: Number(e.target.value) }))}
                      className="w-full h-9 px-2 rounded-lg border border-border bg-surface-light text-sm text-foreground text-center focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setModalAberto(false)}
                className="flex-1 h-10 rounded-lg border border-border text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarAlimento}
                className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
