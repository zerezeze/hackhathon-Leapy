'use client';

import React, { useState } from 'react';
import { useApp, ProjectCard } from '@/context/AppContext';
import { 
  Plus, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  FolderGit2, 
  Clock, 
  Target, 
  AlertCircle,
  X
} from 'lucide-react';

export const ProjectTab: React.FC = () => {
  const { projectCards, moveCard, addProjectCard } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Média' | 'Baixa'>('Média');
  const [competence, setCompetence] = useState('Organização');

  // Modal handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('Média');
    setCompetence('Organização');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !deadline) return;

    addProjectCard({
      title,
      description,
      deadline,
      priority,
      column: 'todo',
      competence,
    });

    handleCloseModal();
  };

  // Helper to format dates for next delivery calculation
  const getNextDelivery = () => {
    const activeCards = projectCards.filter(c => c.column !== 'done');
    if (activeCards.length === 0) return 'Nenhuma pendente';
    // Just pick the one in progress first or the first todo
    const inProgress = activeCards.find(c => c.column === 'in_progress');
    if (inProgress) return `${inProgress.title} (${inProgress.deadline})`;
    return `${activeCards[0].title} (${activeCards[0].deadline})`;
  };

  // Calculate metrics
  const totalCards = projectCards.length;
  const completedCardsCount = projectCards.filter(c => c.column === 'done').length;
  const progressPercent = totalCards > 0 ? Math.round((completedCardsCount / totalCards) * 100) : 0;

  // Group cards by column
  const todoCards = projectCards.filter(c => c.column === 'todo');
  const inProgressCards = projectCards.filter(c => c.column === 'in_progress');
  const reviewCards = projectCards.filter(c => c.column === 'review');
  const doneCards = projectCards.filter(c => c.column === 'done');

  const columns = [
    { id: 'todo', title: 'A Fazer', cards: todoCards, color: 'border-t-slate-300 bg-slate-100/50' },
    { id: 'in_progress', title: 'Em Andamento', cards: inProgressCards, color: 'border-t-violet-500 bg-violet-50/10' },
    { id: 'review', title: 'Em Revisão', cards: reviewCards, color: 'border-t-amber-500 bg-amber-50/10' },
    { id: 'done', title: 'Concluído', cards: doneCards, color: 'border-t-emerald-500 bg-emerald-50/10' },
  ];

  const getPriorityStyle = (p: 'Alta' | 'Média' | 'Baixa') => {
    switch (p) {
      case 'Alta':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Média':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Baixa':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const handleMove = (cardId: string, currentColumn: string, direction: 'left' | 'right') => {
    const columnsOrder: ('todo' | 'in_progress' | 'review' | 'done')[] = ['todo', 'in_progress', 'review', 'done'];
    const currentIndex = columnsOrder.indexOf(currentColumn as any);
    if (currentIndex === -1) return;

    if (direction === 'right' && currentIndex < columnsOrder.length - 1) {
      moveCard(cardId, columnsOrder[currentIndex + 1]);
    } else if (direction === 'left' && currentIndex > 0) {
      moveCard(cardId, columnsOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Percentual Conclusão */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-150/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Conclusão do Projeto</span>
            <FolderGit2 className="w-4 h-4 text-violet-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">{progressPercent}%</span>
            <span className="text-[10px] font-bold text-slate-400">Progresso geral</span>
          </div>
          <div className="w-full h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden mt-3">
            <div 
              className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Tarefas Concluídas */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-150/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Etapas Concluídas</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-800">{completedCardsCount}</span>
            <span className="text-slate-400 font-semibold text-xs">de {totalCards} entregas</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
            Mova os cards para gerenciar o projeto.
          </p>
        </div>

        {/* Metric 3: Próxima Entrega */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-150/40 transition-all duration-300 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Próxima Entrega</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-700 truncate max-w-[280px]">
              {getNextDelivery()}
            </h4>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
              <span className="text-[10px] font-semibold text-slate-400">Status dos prazos:</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50/60 border border-emerald-100 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3 text-emerald-500" /> No Prazo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area: Add button */}
      <div className="flex justify-between items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quadro de Atividades</h3>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-semibold shadow-md shadow-violet-100 transition-all flex items-center gap-1.5 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          Adicionar Etapa
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => (
          <div 
            key={col.id} 
            className={`rounded-2xl border-t-4 border-x border-b border-slate-100 p-4 flex flex-col min-h-[500px] shadow-sm ${col.color}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{col.title}</h4>
              <span className="text-2xs font-extrabold text-slate-400 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded-full">
                {col.cards.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px] pr-1">
              {col.cards.length > 0 ? (
                col.cards.map(card => (
                  <div 
                    key={card.id}
                    className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Priority and Competence Badges */}
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getPriorityStyle(card.priority)}`}>
                          {card.priority}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-violet-100 bg-violet-50/30 text-violet-750 uppercase tracking-wider">
                          {card.competence}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-slate-800 leading-snug mb-1">{card.title}</h5>
                      <p className="text-3xs text-slate-450 leading-relaxed line-clamp-3 mb-3">{card.description}</p>
                    </div>

                    {/* Footer: Date and Assignee */}
                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-3xs text-slate-400 font-semibold">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{card.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{card.assignee}</span>
                        </div>
                      </div>

                      {/* Manual Movement Buttons */}
                      <div className="flex items-center gap-1">
                        {col.id !== 'todo' && (
                          <button
                            onClick={() => handleMove(card.id, col.id, 'left')}
                            title="Mover para esquerda"
                            className="p-1 rounded-md border border-slate-100 text-slate-400 hover:text-slate-650 hover:bg-slate-50 transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {col.id !== 'done' && (
                          <button
                            onClick={() => handleMove(card.id, col.id, 'right')}
                            title="Mover para direita"
                            className="p-1 rounded-md border border-slate-100 text-slate-450 hover:text-slate-650 hover:bg-slate-50 transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 border-2 border-dashed border-slate-200/50 rounded-xl flex items-center justify-center text-center text-slate-400 text-3xs italic">
                  Nenhum card nesta coluna
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Target className="w-4.5 h-4.5 text-violet-500" />
                Adicionar Nova Etapa do Projeto
              </h3>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block" htmlFor="m-title">Título da Etapa</label>
                <input
                  id="m-title"
                  type="text"
                  required
                  placeholder="Ex: Desenhar modelo da apresentação"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-100 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block" htmlFor="m-desc">Descrição Curta</label>
                <textarea
                  id="m-desc"
                  rows={2}
                  required
                  placeholder="Descreva brevemente o escopo e o que deve ser entregue..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-100 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block" htmlFor="m-date">Prazo</label>
                  <input
                    id="m-date"
                    type="text"
                    required
                    placeholder="Ex: 25/08/2026"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-100 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block" htmlFor="m-comp">Competência</label>
                  <select
                    id="m-comp"
                    value={competence}
                    onChange={e => setCompetence(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-100 focus:border-violet-500 focus:ring-violet-500 bg-white"
                  >
                    <option value="Comunicação">Comunicação</option>
                    <option value="Trabalho em equipe">Trabalho em equipe</option>
                    <option value="Organização">Organização</option>
                    <option value="Proatividade">Proatividade</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Prioridade</label>
                <div className="flex items-center gap-2">
                  {(['Alta', 'Média', 'Baixa'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 px-3 border rounded-xl text-center text-xs font-semibold transition-all duration-200 ${
                        priority === p
                          ? p === 'Alta' ? 'bg-rose-50 text-rose-700 border-rose-250 shadow-sm' : p === 'Média' ? 'bg-amber-50 text-amber-700 border-amber-250 shadow-sm' : 'bg-blue-50 text-blue-700 border-blue-250 shadow-sm'
                          : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Actions */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-semibold shadow-md shadow-violet-100 transition-all active:scale-98"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
