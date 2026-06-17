'use client';

import React, { createContext, useContext, useState } from 'react';

type TabType = 'outside' | 'inside';

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isScrollLocked: boolean;
  setIsScrollLocked: (locked: boolean) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('outside');
  const [isScrollLocked, setIsScrollLocked] = useState<boolean>(true);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, isScrollLocked, setIsScrollLocked }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}
