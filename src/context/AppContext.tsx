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

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  deadline: string;
  assignee: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  column: 'todo' | 'in_progress' | 'review' | 'done';
  competence: string;
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
  projectCards: ProjectCard[];
  moveCard: (cardId: string, newColumn: 'todo' | 'in_progress' | 'review' | 'done') => void;
  addProjectCard: (card: Omit<ProjectCard, 'id' | 'assignee'>) => void;
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

const initialProjectCards: ProjectCard[] = [
  {
    id: 'card-1',
    title: 'Conhecer o desafio do projeto',
    description: 'Ler o briefing do projeto corporativo de melhoria de atendimento e compreender as necessidades básicas do time.',
    deadline: '10/06/2026',
    assignee: 'Lucas',
    priority: 'Alta',
    column: 'done',
    competence: 'Organização',
  },
  {
    id: 'card-2',
    title: 'Definir objetivo principal',
    description: 'Estruturar o objetivo geral e as metas mensuráveis do projeto de atendimento ao cliente.',
    deadline: '15/06/2026',
    assignee: 'Lucas',
    priority: 'Alta',
    column: 'done',
    competence: 'Organização',
  },
  {
    id: 'card-3',
    title: 'Pesquisar soluções',
    description: 'Buscar benchmarks de outras empresas parceiras sobre atendimento automatizado e roteiros de suporte.',
    deadline: '25/06/2026',
    assignee: 'Lucas',
    priority: 'Média',
    column: 'done',
    competence: 'Proatividade',
  },
  {
    id: 'card-4',
    title: 'Criar plano de ação',
    description: 'Desenhar as etapas de implementação e prazos do novo script de onboarding de clientes.',
    deadline: '05/07/2026',
    assignee: 'Lucas',
    priority: 'Média',
    column: 'done',
    competence: 'Organização',
  },
  {
    id: 'card-5',
    title: 'Executar primeira entrega',
    description: 'Desenvolver o primeiro rascunho do script de atendimento inicial para novos clientes.',
    deadline: '20/07/2026',
    assignee: 'Lucas',
    priority: 'Alta',
    column: 'in_progress',
    competence: 'Proatividade',
  },
  {
    id: 'card-6',
    title: 'Receber feedback do gestor',
    description: 'Reunião de alinhamento individual com Mariana Silva para revisão do script de atendimento.',
    deadline: '28/07/2026',
    assignee: 'Lucas',
    priority: 'Média',
    column: 'todo',
    competence: 'Comunicação',
  },
  {
    id: 'card-7',
    title: 'Aplicar melhorias',
    description: 'Implementar os ajustes de empatia e controle de tempo sugeridos pelo time no roteiro final.',
    deadline: '10/08/2026',
    assignee: 'Lucas',
    priority: 'Média',
    column: 'todo',
    competence: 'Trabalho em equipe',
  },
  {
    id: 'card-8',
    title: 'Apresentar resultado final',
    description: 'Apresentação de fechamento e demonstração do novo roteiro de atendimento para a coordenação da área.',
    deadline: '20/08/2026',
    assignee: 'Lucas',
    priority: 'Alta',
    column: 'todo',
    competence: 'Comunicação',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mood, setMood] = useState<string | null>(null);
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [projectCards, setProjectCards] = useState<ProjectCard[]>(initialProjectCards);

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
    setProjectCards(initialProjectCards);
  };

  // Calculate overall progress as the average progress of all stages
  const overallProgress = Math.round(
    stages.reduce((acc, stage) => acc + stage.progress, 0) / stages.length
  );

  const submitFeedback = (feedback: FeedbackData) => {
    console.log('Feedback enviado:', feedback);
    setFeedbackSent(true);
  };

  const moveCard = (cardId: string, newColumn: 'todo' | 'in_progress' | 'review' | 'done') => {
    setProjectCards(prev => prev.map(card => {
      if (card.id === cardId) {
        return { ...card, column: newColumn };
      }
      return card;
    }));
  };

  const addProjectCard = (card: Omit<ProjectCard, 'id' | 'assignee'>) => {
    setProjectCards(prev => [
      ...prev,
      {
        ...card,
        id: `card-${Date.now()}`,
        assignee: 'Lucas',
      }
    ]);
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
        projectCards,
        moveCard,
        addProjectCard,
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
