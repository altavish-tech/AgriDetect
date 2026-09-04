import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Farmer Pages
import { WelcomePage } from './pages/farmer/WelcomePage';
import { FarmerHomePage } from './pages/farmer/FarmerHomePage';
import { ReportProblemStep1Page } from './pages/farmer/ReportProblemStep1Page';
import { CropPhotoCapturePage } from './pages/farmer/CropPhotoCapturePage';
import { AiAnalysisProgressPage } from './pages/farmer/AiAnalysisProgressPage';
import { AiDiagnosisResultPage } from './pages/farmer/AiDiagnosisResultPage';
import { UncertainDiagnosisPage } from './pages/farmer/UncertainDiagnosisPage';
import { RiskAnalysisSummaryPage } from './pages/farmer/RiskAnalysisSummaryPage';
import { FarmerAdvisoryGuidePage } from './pages/farmer/FarmerAdvisoryGuidePage';
import { CropHealthProgressPage } from './pages/farmer/CropHealthProgressPage';

// Expert Pages
import { ExpertDashboardPage } from './pages/expert/ExpertDashboardPage';
import { ExpertCaseAnalysisPage } from './pages/expert/ExpertCaseAnalysisPage';

// DAO Pages
import { OfficerMonitoringPage } from './pages/dao/OfficerMonitoringPage';
import { RegionalAnalyticsPage } from './pages/dao/RegionalAnalyticsPage';
import { EarlyWarningCenterPage } from './pages/dao/EarlyWarningCenterPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Welcome Screen */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Main App Layout containing TopAppBar, NavigationDrawer, and BottomNavBar */}
          <Route element={<AppLayout />}>
            {/* Farmer Routes */}
            <Route path="/farmer/home" element={<FarmerHomePage />} />
            <Route path="/farmer/report" element={<ReportProblemStep1Page />} />
            <Route path="/farmer/photo-capture" element={<CropPhotoCapturePage />} />
            <Route path="/farmer/analyzing" element={<AiAnalysisProgressPage />} />
            <Route path="/farmer/diagnosis" element={<AiDiagnosisResultPage />} />
            <Route path="/farmer/uncertain" element={<UncertainDiagnosisPage />} />
            <Route path="/farmer/risk-analysis" element={<RiskAnalysisSummaryPage />} />
            <Route path="/farmer/advisory" element={<FarmerAdvisoryGuidePage />} />
            <Route path="/farmer/progress" element={<CropHealthProgressPage />} />

            {/* Expert Routes */}
            <Route path="/expert/dashboard" element={<ExpertDashboardPage />} />
            <Route path="/expert/case/:caseId" element={<ExpertCaseAnalysisPage />} />

            {/* DAO Officer Routes */}
            <Route path="/dao/monitoring" element={<OfficerMonitoringPage />} />
            <Route path="/dao/analytics" element={<RegionalAnalyticsPage />} />
            <Route path="/dao/early-warnings" element={<EarlyWarningCenterPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
