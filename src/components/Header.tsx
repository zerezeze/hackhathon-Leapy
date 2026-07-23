'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Menu, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  setIsOpenMobile: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setIsOpenMobile }) => {
  const { activeTab, userProfile } = useApp();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'Visão Geral',
          subtitle: 'Acompanhe suas metas, reuniões e tarefas diárias.',
        };
      case 'journey':
        return {
          title: 'Minha Jornada',
          subtitle: 'Sua trilha de desenvolvimento e conquistas na empresa.',
        };
      case 'feedback':
        return {
          title: 'Feedbacks',
          subtitle: 'Acompanhe seu progresso e dê a sua opinião sobre a experiência.',
        };
      case 'development':
        return {
          title: 'Meu Desenvolvimento',
          subtitle: 'Visualize suas competências e conquistas acumuladas.',
        };
      default:
        return {
          title: 'Painel',
          subtitle: '',
        };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
      {/* Page Title & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* User Status / Info */}
      <div className="flex items-center gap-4">
        {/* Next Meeting Banner */}
        <div className="hidden lg:flex items-center gap-2 bg-amber-50/60 border border-amber-100 rounded-xl px-3.5 py-1.5 text-xs text-amber-800">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span className="font-medium">
            Próximo acompanhamento: <strong className="font-semibold">{userProfile.nextMeeting.split(' ')[0]}</strong>
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden xs:block">
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1 justify-end">
              {userProfile.name}
              <Sparkles className="w-3.5 h-3.5 text-violet-500 fill-violet-500" />
            </div>
            <div className="text-2xs text-slate-400 font-medium">
              {userProfile.role} • {userProfile.company}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 font-bold text-sm shadow-inner">
            L
          </div>
        </div>
      </div>
    </header>
  );
};
