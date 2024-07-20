// src/providers/LayoutProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextProps {
  showLayout: boolean;
  setShowLayout: (show: boolean) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLayout, setShowLayout] = useState(true);

  return (
    <LayoutContext.Provider value={{ showLayout, setShowLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};