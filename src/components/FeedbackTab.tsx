'use client';

import React, { useState, useEffect } from 'react';
import { useApp, FeedbackData } from '@/context/AppContext';
import { MessageSquare, Send, CheckCircle, ShieldAlert, Award, Star, ThumbsUp, HeartHandshake, Check, AlertCircle } from 'lucide-react';

export const FeedbackTab: React.FC = () => {
  const { submitFeedback } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'received' | 'send'>('received');

  // Form State
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feelingWelcomed, setFeelingWelcomed] = useState<'yes' | 'no' | 'partially' | ''>('');
  const [evolving, setEvolving] = useState<'yes' | 'no' | 'partially' | ''>('');
  const [suggestions, setSuggestions] = useState<string>('');
  
  // Feedback Success Notification (Toast)
  const [showToast, setShowToast] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const companyFeedbacks = [
    {
      id: 'fb-2',
      gestor: 'Mariana Silva',
      role: 'Coord. de Atendimento',
      data: '20 de Julho de 2026',
      avatar: 'MS',
      positives: [
        'Demonstra excelente empatia e cordialidade na comunicação diária com os clientes.',
        'Busca ativamente ajudar o time nos horários de maior pico de chamados.',
        'Excelente assimilação das diretrizes de atendimento do manual de onboarding.'
      ],
      improvementOpportunities: [
        'Gerenciar melhor a duração média das chamadas para evitar filas excessivas.',
        'Focar em documentar o histórico dos chamados com mais detalhes técnicos.'
      ],
    },
    {
      id: 'fb-1',
      gestor: 'Lucas Mendes',
      role: 'Mentor de Atendimento',
      data: '05 de Julho de 2026',
      avatar: 'LM',
      positives: [
        'Pontualidade rigorosa no início do expediente e reuniões diárias.',
        'Curiosidade para aprender sobre os novos fluxos e ferramentas de atendimento.'
      ],
      improvementOpportunities: [
        'Expressar dúvidas de maneira mais clara e aberta nas reuniões de retrospectiva do time.',
        'Familiarizar-se mais profundamente com os atalhos do sistema de chamados.'
      ],
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setFormError('Por favor, dê uma nota de 1 a 5 estrelas.');
      return;
    }
    if (!feelingWelcomed) {
      setFormError('Por favor, responda se está se sentindo acolhido.');
      return;
    }
    if (!evolving) {
      setFormError('Por favor, responda se sente que está evoluindo.');
      return;
    }

    setFormError('');

    const feedback: FeedbackData = {
      rating,
      feelingWelcomed,
      evolving,
      suggestions
    };

    // Call submit function in context
    submitFeedback(feedback);

    // Reset form fields
    setRating(0);
    setFeelingWelcomed('');
    setEvolving('');
    setSuggestions('');

    // Trigger Toast
    setShowToast(true);
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 animate-fade-in-up">
          <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-tight">Feedback enviado com sucesso.</span>
        </div>
      )}

      {/* Sub Tabs Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-max">
        <button
          onClick={() => setActiveSubTab('received')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            activeSubTab === 'received'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Feedback recebido
        </button>
        <button
          onClick={() => setActiveSubTab('send')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            activeSubTab === 'send'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Enviar feedback
        </button>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'received' ? (
        <div className="space-y-6">
          {companyFeedbacks.map(feedback => (
            <div 
              key={feedback.id} 
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300"
            >
              {/* Left Profile Section */}
              <div className="md:w-1/4 flex flex-row md:flex-col items-center md:items-start gap-4 pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-slate-100 md:pr-6 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-750 flex items-center justify-center font-bold text-sm shadow-inner shrink-0">
                  {feedback.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{feedback.gestor}</h4>
                  <p className="text-3xs text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{feedback.role}</p>
                  <span className="inline-block text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full mt-2">
                    {feedback.data}
                  </span>
                </div>
              </div>

              {/* Right Content Section */}
              <div className="flex-1 space-y-4">
                {/* Pontos Positivos */}
                <div>
                  <h5 className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    Pontos Positivos
                  </h5>
                  <ul className="space-y-1.5 pl-6">
                    {feedback.positives.map((pt, index) => (
                      <li key={index} className="text-xs text-slate-600 leading-relaxed list-disc">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Oportunidades de Melhoria */}
                <div>
                  <h5 className="text-xs font-extrabold text-violet-750 flex items-center gap-1.5 mb-2">
                    <Award className="w-4 h-4 text-violet-650 shrink-0" />
                    Oportunidades de Melhoria
                  </h5>
                  <ul className="space-y-1.5 pl-6">
                    {feedback.improvementOpportunities.map((pt, index) => (
                      <li key={index} className="text-xs text-slate-600 leading-relaxed list-disc">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-slate-50 pb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-violet-600" />
                Enviar Feedback para a Empresa
              </h3>
              <p className="text-xs text-slate-450 mt-1">
                Compartilhe sua percepção sobre o seu onboarding e desenvolvimento na empresa parceira.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                <span className="font-semibold">{formError}</span>
              </div>
            )}

            {/* Nota (1-5 Estrelas) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Sua avaliação sobre o programa (1 a 5 estrelas):
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-lg transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="text-2xs font-bold text-slate-400 ml-2">
                    Nota {rating} de 5
                  </span>
                )}
              </div>
            </div>

            {/* Pergunta: Acolhimento */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Você está se sentindo acolhido?
              </label>
              <div className="flex items-center gap-2 max-w-md">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'partially', label: 'Parcialmente' },
                  { value: 'no', label: 'Não' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setFeelingWelcomed(opt.value as any)}
                    className={`flex-1 py-2 px-3 border rounded-xl text-center text-xs font-semibold transition-all duration-200 ${
                      feelingWelcomed === opt.value
                        ? 'bg-violet-50 text-violet-750 border-violet-200 shadow-sm'
                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta: Evolução */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Você sente que está evoluindo?
              </label>
              <div className="flex items-center gap-2 max-w-md">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'partially', label: 'Parcialmente' },
                  { value: 'no', label: 'Não' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setEvolving(opt.value as any)}
                    className={`flex-1 py-2 px-3 border rounded-xl text-center text-xs font-semibold transition-all duration-200 ${
                      evolving === opt.value
                        ? 'bg-violet-50 text-violet-750 border-violet-200 shadow-sm'
                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Campo: Sugestões */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block" htmlFor="suggestions">
                Sugestões gerais de melhorias ou observações:
              </label>
              <textarea
                id="suggestions"
                rows={4}
                placeholder="Compartilhe suas ideias sobre o que pode melhorar no programa ou sua experiência no dia a dia..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-100 focus:border-violet-500 focus:ring-violet-500 placeholder-slate-400"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-100 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar feedback
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
