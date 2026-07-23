'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Award, CheckCircle2, CircleDot, TrendingUp, BarChart2, Star, Trophy, Clock, Target, Calendar } from 'lucide-react';

export const DevelopmentTab: React.FC = () => {
  const { stages } = useApp();

  // Get completed stages dynamically
  const completedStagesCount = stages.filter(s => s.status === 'completed').length;
  const totalStagesCount = stages.length;

  const competencies = [
    { 
      name: 'Comunicação', 
      progress: 80, 
      desc: 'Habilidade de transmitir ideias com clareza, empatia e cordialidade nas interações com a equipe e com clientes.', 
      objective: 'Participar das reuniões semanais ativamente e redigir e-mails corporativos alinhados com o tom da marca.',
      color: 'from-violet-500 to-indigo-500' 
    },
    { 
      name: 'Trabalho em equipe', 
      progress: 75, 
      desc: 'Colaboração proativa com colegas, compartilhamento de aprendizados e apoio na resolução de problemas do time.', 
      objective: 'Auxiliar no suporte a outros aprendizes da equipe e buscar alinhamento constante com o mentor.',
      color: 'from-indigo-500 to-blue-500' 
    },
    { 
      name: 'Organização', 
      progress: 60, 
      desc: 'Gerenciamento do tempo de trabalho, pontualidade em reuniões e manutenção de registros de atividades e chamados.', 
      objective: 'Manter a agenda e o painel de tarefas atualizados diariamente, evitando atrasos nos chamados.',
      color: 'from-amber-500 to-orange-500' 
    },
    { 
      name: 'Proatividade', 
      progress: 85, 
      desc: 'Iniciativa para buscar novas responsabilidades, propor melhorias operacionais simples e buscar novos conhecimentos.', 
      objective: 'Identificar oportunidades de otimização nos roteiros de atendimento e sugerir melhorias à coordenação.',
      color: 'from-fuchsia-500 to-purple-500' 
    },
  ];

  const pdiItems = [
    {
      id: 'pdi-1',
      objective: 'Aprimorar oratória e clareza em apresentações semanais de resultados',
      competence: 'Comunicação',
      deadline: '15/08/2026',
      status: 'Em Andamento',
      statusColor: 'bg-violet-50 text-violet-750 border-violet-100',
    },
    {
      id: 'pdi-2',
      objective: 'Organizar tarefas diárias e chamados utilizando ferramentas ágeis',
      competence: 'Organização',
      deadline: '30/08/2026',
      status: 'Planejado',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      id: 'pdi-3',
      objective: 'Auxiliar na mentoria técnica de novos jovens aprendizes admitidos',
      competence: 'Trabalho em equipe',
      deadline: '20/09/2026',
      status: 'Planejado',
      statusColor: 'bg-slate-50 text-slate-650 border-slate-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Competencies */}
      <section className="lg:col-span-2 space-y-6">
        {/* Competencies Progress Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <BarChart2 className="w-4.5 h-4.5 text-violet-600" />
              Competências em Foco
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
              Avaliação Mensal
            </span>
          </div>
          <p className="text-xs text-slate-450 mb-6">
            Acompanhe o nível de desenvolvimento de cada competência essencial avaliada pela equipe de coordenação.
          </p>

          <div className="space-y-6">
            {competencies.map((comp) => (
              <div key={comp.name} className="space-y-2 border border-slate-50/50 p-4 rounded-2xl hover:border-slate-100 hover:bg-slate-50/10 transition-all duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-800">{comp.name}</span>
                  <span className="font-extrabold text-violet-600">{comp.progress}%</span>
                </div>
                
                <div className="h-2 bg-slate-50 border border-slate-100/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${comp.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${comp.progress}%` }}
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">Descrição:</strong> {comp.desc}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-violet-600">Objetivo:</strong> {comp.objective}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Meu PDI */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="border-b border-slate-50 pb-4 mb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Target className="w-4.5 h-4.5 text-violet-600" />
              Meu PDI
            </h3>
            <p className="text-xs text-slate-450 mt-1">
              Plano de Desenvolvimento Individual estabelecido em conjunto com seu mentor Mariana Silva.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 w-1/2">Objetivo</th>
                  <th className="pb-3 w-1/6">Competência</th>
                  <th className="pb-3 w-1/6">Prazo</th>
                  <th className="pb-3 w-1/6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {pdiItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-slate-700 leading-relaxed">{item.objective}</td>
                    <td className="py-3.5 text-slate-500 font-medium">{item.competence}</td>
                    <td className="py-3.5 text-slate-500 font-medium">{item.deadline}</td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-based View */}
          <div className="sm:hidden space-y-3">
            {pdiItems.map((item) => (
              <div key={item.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/10 space-y-3">
                <div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <h4 className="text-xs font-bold text-slate-750 mt-2 leading-relaxed">
                    {item.objective}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-2xs font-semibold text-slate-400 pt-2 border-t border-slate-50">
                  <div>
                    <span className="block text-3xs uppercase font-bold text-slate-400">Competência</span>
                    <span className="text-slate-655 mt-0.5 block">{item.competence}</span>
                  </div>
                  <div>
                    <span className="block text-3xs uppercase font-bold text-slate-400">Prazo</span>
                    <span className="text-slate-655 mt-0.5 block">{item.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right Column: Gamification Summary & Timeline */}
      <section className="space-y-6">
        {/* Progress Overview Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shadow-inner">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Conquistas de Onboarding</h4>
            <p className="text-xs text-slate-400 mt-1">
              Etapas concluídas da jornada de desenvolvimento.
            </p>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">
            {completedStagesCount} <span className="text-slate-400 font-semibold text-xs">de {totalStagesCount} concluídas</span>
          </div>
        </div>

        {/* History Evolution Timeline */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Clock className="w-4.5 h-4.5 text-indigo-500" />
            Linha do Tempo
          </h3>

          <div className="relative pl-4 border-l border-slate-100 space-y-5 py-1 ml-2">
            <div className="relative">
              <div className="absolute -left-[24px] top-0.5 w-4 h-4 rounded-full border flex items-center justify-center text-violet-600 bg-violet-50 border-violet-200">
                <CircleDot className="w-2 h-2" />
              </div>
              <div>
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Julho de 2026</span>
                <h4 className="text-xs font-bold text-slate-700 mt-1">Treinamento de Atendimento</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Início das atividades práticas assistidas e preenchimento de autoavaliação de competências.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[24px] top-0.5 w-4 h-4 rounded-full border flex items-center justify-center text-emerald-500 bg-emerald-50 border-emerald-100">
                <CheckCircle2 className="w-2 h-2" />
              </div>
              <div>
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Junho de 2026</span>
                <h4 className="text-xs font-bold text-slate-700 mt-1">Integração Concluída</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Admissão, recepção de boas-vindas do time e alinhamentos de escopo da vaga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
