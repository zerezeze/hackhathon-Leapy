'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Stage {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'blocked';
  progress: number;
}

export interface FeedbackData {
  rating: number;
  feelingWelcomed: 'yes' | 'no' | 'partially' | '';
  evolving: 'yes' | 'no' | 'partially' | '';
  suggestions: string;
}

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mood: string | null;
  setMood: (mood: string | null) => void;
  stages: Stage[];
  completeStage: (stageId: string) => void;
  resetJourney: () => void;
  overallProgress: number;
  submitFeedback: (feedback: FeedbackData) => void;
  feedbackSent: boolean;
  setFeedbackSent: (sent: boolean) => void;
  userProfile: {
    name: string;
    role: string;
    company: string;
    mentor: string;
    nextMeeting: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStages: Stage[] = [
  {
    id: 'stage-1',
    title: 'Boas-vindas',
    description: 'Boas-vindas à empresa, integração com a equipe e primeiro dia de trabalho.',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'stage-2',
    title: 'Conhecendo a empresa',
    description: 'Apresentação institucional da Empresa Parceira, cultura, valores e áreas de negócio.',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'stage-3',
    title: 'Primeiras atividades',
    description: 'Configuração das ferramentas iniciais de trabalho e primeiros passos no atendimento de chamados.',
    status: 'in_progress',
    progress: 40,
  },
  {
    id: 'stage-4',
    title: 'Comunicação',
    description: 'Treinamento de boas práticas de comunicação interna, redação de e-mails corporativos e uso do Slack.',
    status: 'blocked',
    progress: 0,
  },
  {
    id: 'stage-5',
    title: 'Desenvolvimento de competências',
    description: 'Treinamentos práticos aprofundados de atendimento ao cliente e acompanhamento do PDI.',
    status: 'blocked',
    progress: 0,
  },
  {
    id: 'stage-6',
    title: 'Conclusão',
    description: 'Avaliação final do período de integração e alinhamento dos próximos passos na empresa.',
    status: 'blocked',
    progress: 0,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mood, setMood] = useState<string | null>(null);
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const userProfile = {
    name: 'Lucas',
    role: 'Jovem Aprendiz de Atendimento',
    company: 'Empresa Parceira',
    mentor: 'Mariana Silva (Coord. de Atendimento)',
    nextMeeting: '30/07/2026 às 15:00',
  };

  const completeStage = (stageId: string) => {
    setStages(prevStages => {
      const updatedStages = prevStages.map((stage, index) => {
        if (stage.id === stageId) {
          return {
            ...stage,
            status: 'completed' as const,
            progress: 100,
          };
        }
        return stage;
      });

      // Automatically unblock and set the next stage to in_progress
      const currentStageIndex = prevStages.findIndex(s => s.id === stageId);
      if (currentStageIndex !== -1 && currentStageIndex < updatedStages.length - 1) {
        const nextStage = updatedStages[currentStageIndex + 1];
        if (nextStage.status === 'blocked') {
          updatedStages[currentStageIndex + 1] = {
            ...nextStage,
            status: 'in_progress' as const,
            progress: 0,
          };
        }
      }

      return updatedStages;
    });
  };

  const resetJourney = () => {
    setStages(initialStages);
    setMood(null);
  };

  // Calculate overall progress as the average progress of all stages
  const overallProgress = Math.round(
    stages.reduce((acc, stage) => acc + stage.progress, 0) / stages.length
  );

  const submitFeedback = (feedback: FeedbackData) => {
    console.log('Feedback enviado:', feedback);
    setFeedbackSent(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        mood,
        setMood,
        stages,
        completeStage,
        resetJourney,
        overallProgress,
        submitFeedback,
        feedbackSent,
        setFeedbackSent,
        userProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
