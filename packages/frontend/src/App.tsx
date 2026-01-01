import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { CMainLayout } from '@/shared/components/CMainLayout';
import { CHomePage } from '@/modules/home/pages/CHomePage';
import { CAcademicPlanningModule } from '@/modules/academic-planning/pages/CAcademicPlanningModule';
import { AuthProvider } from '@/shared/contexts/AuthContext';

import './i18n';
import { theme } from './theme';
import { CCareerGuidanceModule } from './modules/career-guidance/pages/CCareerGuidanceModule';
import { CFinancialPlanningModule } from './modules/financial-planning/pages/CFinancialPlanningModule';
import { CAdviceListPage } from './modules/advice/pages/CAdviceListPage';
import { CPersonalDevelopmentModule } from './modules/personal-development/pages/CPersonalDevelopmentModule';
import { CStudySkillsModule } from './modules/study-skills/pages/CStudySkillsModule';
import { CUniversityLifeModule } from './modules/university-life/pages/CUniversityLifeModule';
import CQuestionsListPage from './modules/questions/pages/CQuestionsListPage';
import { CAboutPage } from './modules/about/pages/CAboutPage';
import { CLogin } from './modules/auth/pages/CLogin';
import { CSignup } from './modules/auth/pages/CSignup';
import { CForgotPassword } from './modules/auth/pages/CForgotPassword';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/login" element={<CLogin />} />
            <Route path="/signup" element={<CSignup />} />
            <Route path="/forgot-password" element={<CForgotPassword />} />

            <Route element={<CMainLayout />}>
              <Route path="/" element={<CHomePage />} />
              <Route
                path="/academic-planning"
                element={<CAcademicPlanningModule />}
              />
              <Route
                path="/career-guidance"
                element={<CCareerGuidanceModule />}
              />
              <Route
                path="/university-life"
                element={<CUniversityLifeModule />}
              />
              <Route path="/study-skills" element={<CStudySkillsModule />} />
              <Route
                path="/personal-development"
                element={<CPersonalDevelopmentModule />}
              />
              <Route
                path="/financial-planning"
                element={<CFinancialPlanningModule />}
              />
              <Route path="/advice" element={<CAdviceListPage />} />
              <Route path="/questions" element={<CQuestionsListPage />} />
              <Route path="/about" element={<CAboutPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
