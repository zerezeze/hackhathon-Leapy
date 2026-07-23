'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Calendar, 
  MessageSquareQuote, 
  ArrowRight,
  TrendingUp,
  Compass,
  Smile
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { 
    userProfile, 
    overallProgress, 
    mood, 
    setMood, 
    stages,
    setActiveTab 
  } = useApp();

  // Next incomplete stage or the currently active stage
  const nextStage = stages.find(s => s.status === 'in_progress') || stages.find(s => s.status === 'blocked') || stages[stages.length - 1];

  const moodOptions = [
    { value: 'sad', emoji: '😞', label: 'Cansado', bg: 'hover:bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    { value: 'neutral', emoji: '😐', label: 'Neutro', bg: 'hover:bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' },
    { value: 'good', emoji: '🙂', label: 'Bem', bg: 'hover:bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
    { value: 'happy', emoji: '😊', label: 'Feliz', bg: 'hover:bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    { value: 'excited', emoji: '🤩', label: 'Animado', bg: 'hover:bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  ];

  const getMoodMessage = () => {
    switch (mood) {
      case 'sad':
        return {
          title: 'Força, Lucas!',
          message: 'Todo mundo tem dias mais cansados. Respire fundo, faça pausas quando necessário e lembre-se que seu mentor Mariana está à disposição!',
          bg: 'bg-blue-50/50 border border-blue-100 text-blue-800',
        };
      case 'neutral':
        return {
          title: 'Dia focado!',
          message: 'Um dia focado e calmo é excelente para progredir nas tarefas. Tenha um ótimo expediente!',
          bg: 'bg-slate-50/50 border border-slate-100 text-slate-800',
        };
      case 'good':
        return {
          title: 'Que ótimo!',
          message: 'Ficamos muito felizes que você esteja se sentindo bem. Aproveite essa energia positiva para o seu dia de aprendizado!',
          bg: 'bg-teal-50/50 border border-teal-100 text-teal-800',
        };
      case 'happy':
        return {
          title: 'Sorriso no rosto!',
          message: 'Sua atitude positiva faz toda a diferença no ambiente corporativo. Continue assim!',
          bg: 'bg-violet-50/50 border border-violet-100 text-violet-800',
        };
      case 'excited':
        return {
          title: 'Incrível, Lucas!',
          message: 'Essa animação é contagiante! É o momento perfeito para absorver novos conhecimentos e concluir etapas da jornada.',
          bg: 'bg-amber-50/50 border border-amber-100 text-amber-800',
        };
      default:
        return null;
    }
  };

  const moodMsg = getMoodMessage();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-violet-100">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none">
          <div className="w-full h-full border-[30px] border-white rounded-full translate-x-12 translate-y-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-100 flex items-center gap-1.5 w-max">
            <Sparkles className="w-3.5 h-3.5" /> Onboarding Ativo
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 tracking-tight">
            Olá, {userProfile.name}! Bem-vindo à sua jornada.
          </h1>
          <p className="text-violet-100 text-sm mt-2 font-medium">
            Jovem Aprendiz de Atendimento na <strong className="text-white font-semibold">{userProfile.company}</strong>.
          </p>
        </div>
      </section>

      {/* Grid de Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Meu progresso */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-violet-600" />
                Meu progresso
              </h3>
              <span className="text-xs font-extrabold bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full border border-violet-100/30">
                {overallProgress}% Concluído
              </span>
            </div>
            
            <div className="space-y-4 py-3">
              <div className="h-3 bg-slate-50 border border-slate-100/50 rounded-full overflow-hidden">
                <div
                  style={{ width: `${overallProgress}%` }}
                  className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500 rounded-full"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este progresso é calculado a partir da conclusão média de todas as etapas de sua trilha.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-50 text-right">
            <button 
              onClick={() => setActiveTab('journey')}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 ml-auto group"
            >
              Ver jornada <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Card: Próxima atividade */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Compass className="w-4.5 h-4.5 text-violet-600" />
                Próxima atividade
              </h3>
              {nextStage && (
                <span className="text-[10px] font-bold bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {nextStage.status === 'blocked' ? 'A seguir' : 'Ativa'}
                </span>
              )}
            </div>

            {nextStage ? (
              <div className="py-2 space-y-2">
                <h4 className="text-sm font-bold text-slate-700">{nextStage.title}</h4>
                <p className="text-xs text-slate-450 leading-relaxed line-clamp-2">
                  {nextStage.description}
                </p>
                {nextStage.status !== 'blocked' && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xs font-bold text-slate-400">Progresso atual:</span>
                    <span className="text-2xs font-extrabold text-violet-600 bg-violet-50/50 border border-violet-100/20 px-2 py-0.5 rounded-full">{nextStage.progress}%</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs">
                Parabéns! Todas as etapas foram concluídas.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 text-right">
            <button 
              onClick={() => setActiveTab('journey')}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 ml-auto group"
            >
              Ir para jornada <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Card: Último feedback recebido */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquareQuote className="w-4.5 h-4.5 text-violet-600" />
                Último feedback recebido
              </h3>
              <span className="text-2xs font-semibold text-slate-400">20/07/2026</span>
            </div>

            <div className="py-1">
              <p className="text-xs italic text-slate-650 leading-relaxed line-clamp-3">
                "Excelente proatividade no atendimento inicial aos clientes. Demonstra muita empatia e clareza ao explicar os procedimentos básicos."
              </p>
              <div className="flex items-center justify-between mt-3 text-3xs font-semibold text-slate-400">
                <span>Gestor: Mariana Silva</span>
                <span>Coord. de Atendimento</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 text-right">
            <button 
              onClick={() => setActiveTab('feedback')}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 ml-auto group"
            >
              Histórico completo <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Card: Como estou me sentindo hoje? */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Smile className="w-4.5 h-4.5 text-violet-600" />
                Como estou me sentindo hoje?
              </h3>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-200 ${option.bg} ${
                    mood === option.value
                      ? 'bg-violet-50/50 border-violet-500 scale-102 ring-1 ring-violet-500/20'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <span className="text-xl sm:text-2xl mb-1">{option.emoji}</span>
                  <span className="text-3xs font-semibold text-slate-450">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mensagem de Humor */}
          <div className="min-h-[56px] mt-4 flex items-center">
            {moodMsg ? (
              <div className={`p-3 rounded-xl w-full text-2xs leading-relaxed transition-all duration-300 ${moodMsg.bg}`}>
                <strong className="font-bold">{moodMsg.title}</strong> {moodMsg.message}
              </div>
            ) : (
              <div className="p-3 text-2xs text-slate-400 text-center w-full italic border border-dashed border-slate-100 rounded-xl">
                Selecione uma opção acima para compartilhar seu humor diário.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Próximos encontros rápidas */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-700">Encontro Individual de Acompanhamento</h4>
            <p className="text-3xs text-slate-450">Foco em feedbacks mensais e revisão da trilha.</p>
          </div>
          <div className="text-right sm:text-right shrink-0">
            <span className="text-2xs font-extrabold text-slate-700">{userProfile.nextMeeting}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
