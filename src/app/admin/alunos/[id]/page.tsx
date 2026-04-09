"use client";

import { useState } from "react";
import Link from "next/link";

const aluno = {
  id: 35373,
  nome: "Glenda Oliveira Silva",
  email: "glendaoliveira2401@gmail.com",
  telefone: "+55 (34) 99125-4692",
  nascimento: "24/01/2003",
  idade: 23,
  genero: "Feminino",
  altura: null,
  peso: null,
  condicionamento: null,
  nivelAtividade: null,
  status: "Ativo",
  ultimaModificacao: "09/04/2026 14:48",
  ultimoAcesso: "09/04/2026",
  planoTreino: true,
  planoDieta: false,
  vigencia: "18/09/2026",
  fichasTreino: [{ nome: "Mesociclo 1 Base", atualizacao: "31/03/2026 20:44" }],
  fichasDieta: [],
};

const tabs = [
  "Fotos",
  "Treinos e progressão",
  "Adesão à dieta",
  "Peso corporal e métricas",
  "Questionários",
  "Avaliações físicas",
];

export default function AlunoDetailPage() {
  const [activeTab, setActiveTab] = useState("Fotos");
  const [planoTreino, setPlanoTreino] = useState(aluno.planoTreino);
  const [planoDieta, setPlanoDieta] = useState(aluno.planoDieta);
  const [observacoes, setObservacoes] = useState("");

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/admin/alunos" className="hover:text-primary transition-colors">
          ← Detalhes de aluno
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-white">G</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{aluno.nome}</h1>
            <p className="text-sm text-muted">Última modificação em {aluno.ultimaModificacao}</p>
            <p className="text-sm text-muted">Último acesso ao app em {aluno.ultimoAcesso}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Ativo
          </span>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface-light transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Abrir chat
          </button>
        </div>
      </div>

      {/* Informações do aluno */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <h2 className="font-semibold text-foreground">Informações do aluno</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 — dados pessoais */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Nome</p>
              <p className="text-sm text-muted">{aluno.nome}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">E-mail</p>
              <p className="text-sm text-muted">{aluno.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Telefone</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted">{aluno.telefone}</p>
                <a href={`https://wa.me/${aluno.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <button className="text-muted hover:text-foreground transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Data de nascimento</p>
              <p className="text-sm text-muted">{aluno.nascimento}</p>
            </div>
          </div>

          {/* Coluna 2 — planos */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">Planos ativos</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlanoTreino(!planoTreino)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${planoTreino ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${planoTreino ? "translate-x-5" : ""}`} />
                </button>
                <span className="text-sm text-foreground">Treino</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlanoDieta(!planoDieta)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${planoDieta ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${planoDieta ? "translate-x-5" : ""}`} />
                </button>
                <span className="text-sm text-foreground">Dieta</span>
              </div>
            </div>
          </div>

          {/* Coluna 3 — vigência */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">Vigência do plano</p>
            <div className="relative">
              <input
                type="text"
                defaultValue={aluno.vigencia}
                className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Dados físicos */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Altura</p><p className="text-sm text-muted">Não informado cm</p></div>
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Peso</p><p className="text-sm text-muted">Não informado kg</p></div>
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Idade</p><p className="text-sm text-muted">{aluno.idade} anos</p></div>
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Gênero</p><p className="text-sm text-muted">{aluno.genero}</p></div>
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Condicionamento físico</p><p className="text-sm text-muted">Não informado</p></div>
          <div><p className="text-sm font-semibold text-foreground mb-0.5">Nível de atividade</p><p className="text-sm text-muted">Não informado</p></div>
        </div>
      </div>

      {/* Fichas */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <rect x="2" y="3" width="20" height="18" rx="2" /><path d="M6.5 7h11M6.5 12h11M6.5 17h6" />
          </svg>
          <h2 className="font-semibold text-foreground">Fichas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Treino */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">Treino</p>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  PDF
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors">
                  + Novo treino
                </button>
              </div>
            </div>
            {aluno.fichasTreino.map((f) => (
              <div key={f.nome} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface-light transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">{f.nome}</p>
                  <p className="text-xs text-muted">Última atualização: {f.atualizacao}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
            ))}
          </div>

          {/* Dieta */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">Dieta</p>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  PDF
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors">
                  + Nova dieta
                </button>
              </div>
            </div>
            <p className="text-sm text-muted">Nenhuma ficha de dieta ativa</p>
          </div>
        </div>
      </div>

      {/* Observações pessoais */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <h2 className="font-semibold text-foreground">Observações pessoais</h2>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border border-border rounded-t-lg bg-surface-light">
          <select className="text-xs text-foreground bg-transparent border-none focus:outline-none pr-1">
            <option>Normal</option>
            <option>Título</option>
          </select>
          <div className="w-px h-4 bg-border mx-1" />
          {["B", "I", "U", "S"].map((f) => (
            <button key={f} className={`w-7 h-7 flex items-center justify-center rounded text-sm hover:bg-border transition-colors ${f === "B" ? "font-bold" : f === "I" ? "italic" : f === "U" ? "underline" : "line-through"}`}>{f}</button>
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-border transition-colors text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="6" y1="14" x2="18" y2="14" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
          </button>
        </div>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Escreva observações sobre o aluno..."
          className="w-full h-32 px-3 py-3 border border-t-0 border-border rounded-b-lg bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none resize-none"
        />
      </div>

      {/* Atualizações */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <h2 className="font-semibold text-foreground">Atualizações</h2>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">Atualizações programadas</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-light transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Histórico
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors">
              + Nova Atualização
            </button>
          </div>
        </div>

        {/* Estado vazio */}
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-border">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-sm text-muted">Nenhuma atualização programada</p>
          <button className="mt-2 inline-flex items-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
            + Adicionar Atualização
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-semibold text-foreground mb-2">Última data que o aluno foi atualizado pelo profissional</p>
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Selecione uma data"
              className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-surface text-sm text-muted focus:outline-none focus:border-primary transition-colors"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Fotos" && (
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-foreground">Atualização de fotos</p>
                  <button className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                    + Adicionar fotos
                  </button>
                </div>
                <EmptyState label="Nenhuma atualização de fotos encontrada" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-foreground">Comparação de fotos</p>
                  <button className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                    + Adicionar comparação
                  </button>
                </div>
                <EmptyState label="Nenhuma comparação de fotos disponível." />
              </div>
            </div>
          )}

          {activeTab === "Treinos e progressão" && <EmptyState label="Nenhum treino registrado ainda" />}
          {activeTab === "Adesão à dieta" && <EmptyState label="Nenhuma adesão registrada ainda" />}
          {activeTab === "Peso corporal e métricas" && <EmptyState label="Nenhuma métrica registrada ainda" />}
          {activeTab === "Questionários" && <EmptyState label="Nenhum questionário respondido ainda" />}
          {activeTab === "Avaliações físicas" && <EmptyState label="Nenhuma avaliação registrada ainda" />}
        </div>

        <div className="px-6 py-4 border-t border-border text-xs text-muted text-center">
          Copyright © 2026 Team NTK. All rights reserved.
        </div>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-border">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
