"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import Preloader from "@/app/components/Preloader";

interface PreloaderContextType {
  isLoading: boolean;
  complete: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined
);

export const PreloaderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setShowPreloader(false);
    }, 650);
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        complete: handleComplete,
      }}
    >
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = (): PreloaderContextType => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within PreloaderProvider");
  }
  return context;
};

export default PreloaderProvider;
