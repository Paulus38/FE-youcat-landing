import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

interface BuildContextType {
  isBuilding: boolean;
  setIsBuilding: (value: boolean) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBuilding, setIsBuilding] = useState(false);
  const { t } = useLanguage();

  return (
    <BuildContext.Provider value={{ isBuilding, setIsBuilding }}>
      {isBuilding && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            color: 'white',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <div className="loading-spinner" style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
          <h2 style={{ marginBottom: '10px' }}>{t('systemBuilding')}</h2>
          <p>{t('pleaseWait')}</p>
        </div>
      )}
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}; 