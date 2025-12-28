import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { CMainLayout } from '@/shared/components/CMainLayout';
import { CHomePage } from '@/modules/home/pages/CHomePage';
import { CAcademicPlanningModule } from '@/modules/academic-planning/pages/CAcademicPlanningModule';

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

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CMainLayout>
          <Routes>
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
          </Routes>
        </CMainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
