import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './i18n';
import { FinancialPlanningModule } from './modules/financial-planning/pages/FinancialPlanningModule';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/financial-planning"
            element={<FinancialPlanningModule />}
          />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
