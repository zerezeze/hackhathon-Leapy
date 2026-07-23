'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { OverviewTab } from '@/components/OverviewTab';
import { JourneyTab } from '@/components/JourneyTab';
import { FeedbackTab } from '@/components/FeedbackTab';
import { DevelopmentTab } from '@/components/DevelopmentTab';

function MainLayout() {
  const { activeTab } = useApp();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'journey':
        return <JourneyTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'development':
        return <DevelopmentTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-slate-600">
      {/* Sidebar Navigation */}
      <Sidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Sticky Header */}
        <Header setIsOpenMobile={setIsOpenMobile} />

        {/* Tab Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto transition-all duration-300">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
