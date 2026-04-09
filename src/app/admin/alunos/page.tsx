"use client";

import { useState } from "react";

const statCards = [
  { label: "Alunos ativos", value: 3, color: "border-green-500", textColor: "text-green-500", bg: "bg-green-50" },
  { label: "Pendentes de atualização pelo profissional", value: 0, color: "border-orange-400", textColor: "text-orange-400", bg: "bg-white" },
  { label: "Alunos que esqueceram de atualizar", value: 0, color: "border-yellow-400", textColor: "text-yellow-400", bg: "bg-white" },
  { label: "Planos vencidos", value: 0, color: "border-red-500", textColor: "text-red-500", bg: "bg-white" },
  { label: "Aniversariantes do dia", value: 0, color: "border-blue-500", textColor: "text-blue-500", bg: "bg-white" },
  { label: "Alunos inativos", value: 0, color: "border-gray-400", textColor: "text-gray-400", bg: "bg-white" },
];

const mockAlunos = [
  { id: 35373, nome: "Glenda Oliveira Silva", email: "glendaoliveira2401@gmail.com", whatsapp: "+5534991254692", status: "Ativo" },
  { id: 35991, nome: "Julia Miggiorini Crespo", email: "crespojulia913@gmail.com", whatsapp: "+5534991111111", status: "Ativo" },
  { id: 35562, nome: "Piter Moreira Violim", email: "pitermoreirav@gmail.com", whatsapp: "+5534992222222", status: "Ativo" },
];

function getInitial(nome: string) {
  return nome.charAt(0).toUpperCase();
}

const avatarColors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
];

function getAvatarColor(index: number) {
  return avatarColors[index % avatarColors.length];
}

export default function AlunosPage() {
  const [search, setSearch] = useState("");

  const filtered = mockAlunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border-t-4 ${card.color} ${card.bg} border border-border bg-surface p-5 flex flex-col gap-3 cursor-pointer hover:shadow-sm transition-shadow`}
          >
            <p className="text-sm text-muted leading-snug">{card.label}</p>
            <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filtros avançados */}
      <div>
        <button className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros avançados
        </button>
      </div>

      {/* Cabeçalho da tabela */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Alunos</h1>
          <button className="text-muted hover:text-foreground transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            2 alunos gratuitos restantes
          </span>
          <button className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
            Criar convite
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Busca rápida */}
        <div className="px-6 py-4 border-b border-border">
          <div className="relative max-w-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 h-9 rounded-lg border border-border bg-surface-light text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-light border-b border-border">
                <th className="text-left px-6 py-3 text-muted font-semibold">
                  <div className="flex items-center gap-1">
                    Id
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-muted font-semibold">
                  <div className="flex items-center gap-1">
                    Nome
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-muted font-semibold">E-mail</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">WhatsApp</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((aluno, i) => (
                <tr key={aluno.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-6 py-4 text-muted">{aluno.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(i)} flex items-center justify-center shrink-0`}>
                        <span className="text-xs font-bold text-white">{getInitial(aluno.nome)}</span>
                      </div>
                      <a href={`/admin/alunos/${aluno.id}`} className="text-primary font-medium hover:underline">
                        {aluno.nome}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{aluno.email}</td>
                  <td className="px-6 py-4">
                    <a href={`https://wa.me/${aluno.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      aluno.status === "Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {aluno.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-muted text-sm">
                    Nenhum aluno encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <span className="text-sm text-muted">1-{filtered.length} de {filtered.length} itens</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted hover:bg-surface-light disabled:opacity-40" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted hover:bg-surface-light disabled:opacity-40" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <select className="h-8 px-2 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none">
              <option>10 / página</option>
              <option>25 / página</option>
              <option>50 / página</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
