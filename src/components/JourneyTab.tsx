'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Circle, Lock, Play, Compass, Award, Check } from 'lucide-react';

export const JourneyTab: React.FC = () => {
  const { stages, completeStage, resetJourney, overallProgress } = useApp();

  const getStatusDetails = (status: 'completed' | 'in_progress' | 'blocked') => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-100',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          labelText: 'Concluída',
        };
      case 'in_progress':
        return {
          icon: Play,
          iconColor: 'text-violet-500 bg-violet-50 border-violet-100 animate-pulse-subtle',
          badgeClass: 'bg-violet-50 text-violet-700 border-violet-100',
          labelText: 'Em Andamento',
        };
      case 'blocked':
      default:
        return {
          icon: Lock,
          iconColor: 'text-slate-400 bg-slate-50 border-slate-100',
          badgeClass: 'bg-slate-50 text-slate-505 border-slate-100',
          labelText: 'Bloqueada',
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Card */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-violet-600" />
            Trilha de Desenvolvimento
          </h3>
          <p className="text-xs text-slate-450 max-w-xl">
            Siga as etapas do programa de onboarding. Ao concluir cada etapa, a seguinte será liberada automaticamente.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={resetJourney}
            className="px-4 py-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition-all duration-200"
          >
            Reiniciar Jornada
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-slate-100 space-y-6 py-2 ml-4">
        {stages.map((stage, sIdx) => {
          const { icon: StatusIcon, iconColor, badgeClass, labelText } = getStatusDetails(stage.status);
          const isBlocked = stage.status === 'blocked';
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in_progress';

          return (
            <div key={stage.id} className="relative group">
              {/* Timeline Indicator */}
              <div className={`absolute -left-[39px] md:-left-[47px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${iconColor}`}>
                <StatusIcon className="w-4 h-4" />
              </div>

              {/* Stage Card */}
              <div className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                isBlocked 
                  ? 'border-slate-100 opacity-60 bg-slate-50/20' 
                  : 'border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-md hover:shadow-slate-150/40'
              }`}>
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${badgeClass}`}>
                        {labelText}
                      </span>
                      <span className="text-3xs font-semibold text-slate-400">Etapa {sIdx + 1} de {stages.length}</span>
                    </div>
                    <h4 className={`text-sm sm:text-base font-extrabold ${isBlocked ? 'text-slate-500' : 'text-slate-800'}`}>
                      {stage.title}
                    </h4>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-3xs font-bold text-slate-400 block">Progresso</span>
                      <div className="text-xs font-extrabold text-slate-700">{stage.progress}%</div>
                    </div>
                    <div className="w-16 h-2 bg-slate-50 border border-slate-100/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${isCompleted ? 'from-emerald-500 to-teal-500' : 'from-violet-600 to-indigo-600'} transition-all duration-500`}
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-450 leading-relaxed mt-3 mb-4 max-w-2xl">
                  {stage.description}
                </p>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="text-3xs text-slate-400 font-medium">
                    {isBlocked && 'Aguardando conclusão das etapas anteriores'}
                    {isCompleted && 'Etapa concluída com sucesso!'}
                    {isInProgress && 'Realize as atividades desta etapa para concluir'}
                  </div>

                  {isInProgress && (
                    <button
                      onClick={() => completeStage(stage.id)}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-semibold shadow-md shadow-violet-100 transition-all flex items-center gap-1.5 active:scale-98"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Concluir
                    </button>
                  )}

                  {isCompleted && (
                    <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Concluído
                    </div>
                  )}

                  {isBlocked && (
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold border border-slate-200/50 cursor-not-allowed flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Bloqueado
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
