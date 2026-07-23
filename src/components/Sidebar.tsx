'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LayoutDashboard, Compass, MessageSquare, LineChart, LogOut, Kanban } from 'lucide-react';

interface SidebarProps {
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, setIsOpenMobile }) => {
  const { activeTab, setActiveTab } = useApp();

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'journey', label: 'Minha Jornada', icon: Compass },
    { id: 'project', label: 'Meu Projeto', icon: Kanban },
    { id: 'feedback', label: 'Feedbacks', icon: MessageSquare },
    { id: 'development', label: 'Meu Desenvolvimento', icon: LineChart },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-100">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">Impulso</h1>
            <p className="text-[10px] font-bold text-violet-600 tracking-wider uppercase">Programa</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 shadow-sm shadow-violet-50/50'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-500'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info/Logout mock */}
        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 text-slate-400 hover:text-slate-600 cursor-pointer">
            <span className="text-xs font-medium">Versão 1.0.0</span>
            <LogOut className="w-4 h-4" />
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay (Drawer) */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Mobile Content */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white shadow-xl md:hidden transition-transform duration-300 flex flex-col ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">Impulso</h1>
              <p className="text-[10px] font-bold text-violet-600 tracking-wider uppercase">Programa</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpenMobile(false)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50 text-center text-xs text-slate-400">
          Versão 1.0.0
        </div>
      </div>
    </>
  );
};
