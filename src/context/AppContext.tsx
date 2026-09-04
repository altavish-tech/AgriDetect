import React, { createContext, useContext, useState } from 'react';
import { UserRole, Language, CropCase, RegionalAlert } from '../types';
import { INITIAL_CASES, REGIONAL_ALERTS } from '../data/mockData';

interface ReportDraft {
  crop: string;
  stage: string;
  location: string;
  imageUrl?: string;
  voiceNote?: boolean;
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cases: CropCase[];
  activeCaseId: string;
  setActiveCaseId: (id: string) => void;
  getCaseById: (id: string) => CropCase | undefined;
  updateCaseVerification: (id: string, diagnosis: string, comments: string) => void;
  reportDraft: ReportDraft;
  updateReportDraft: (fields: Partial<ReportDraft>) => void;
  resetReportDraft: () => void;
  alerts: RegionalAlert[];
  broadcastAdvisory: (sector: string, message?: string) => void;
  dispatchTeam: (sector: string) => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [cases, setCases] = useState<CropCase[]>(INITIAL_CASES);
  const [activeCaseId, setActiveCaseId] = useState<string>('AD-7829-T');
  const [alerts, setAlerts] = useState<RegionalAlert[]>(REGIONAL_ALERTS);
  const [toast, setToast] = useState<string | null>(null);

  const [reportDraft, setReportDraft] = useState<ReportDraft>({
    crop: 'Tomato',
    stage: 'Vegetative',
    location: 'Siwan, Bihar',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCx62hAVg7rL9SBsqf_O0MLg_Hh5YR4y0MVmWuLqurxX6EbQBkYEMOzgu6o_6YeXy6FEfQJDiNjtvjvM0uB7LYW7dMqdmcY-rRcM79oS-x5zIxCYJ_sqzR1xt6_74QLU5BrGHX_fQbFEHYC3jQ4V4why5t5Y0FrvtRDW5YK7qmxi108Io3mNqyGsScVZMKPu_HRWgdgxalWF7FlmbM3SXctCHqVd3Qts4GoWz_i8GMyK1hSkfK_-rWEA',
  });

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  const updateReportDraft = (fields: Partial<ReportDraft>) => {
    setReportDraft((prev) => ({ ...prev, ...fields }));
  };

  const resetReportDraft = () => {
    setReportDraft({
      crop: 'Tomato',
      stage: 'Vegetative',
      location: 'Siwan, Bihar',
    });
  };

  const getCaseById = (id: string) => {
    return cases.find((c) => c.id === id);
  };

  const updateCaseVerification = (id: string, diagnosis: string, comments: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'verified',
              expertDiagnosis: diagnosis,
              expertComments: comments,
            }
          : c
      )
    );
    showToast(`Case #${id} successfully verified and advisory sent to farmer.`);
  };

  const broadcastAdvisory = (sector: string, message?: string) => {
    showToast(`Emergency Advisory broadcast sent to all registered farmers in ${sector}!`);
  };

  const dispatchTeam = (sector: string) => {
    showToast(`Agricultural Rapid Response Team dispatched to ${sector}.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        cases,
        activeCaseId,
        setActiveCaseId,
        getCaseById,
        updateCaseVerification,
        reportDraft,
        updateReportDraft,
        resetReportDraft,
        alerts,
        broadcastAdvisory,
        dispatchTeam,
        toast,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-outline animate-bounce">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="font-body-md text-sm font-medium">{toast}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
