import { Container, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FinancialTips } from '../components/FinancialTips';
import { FinancialPlan } from '../components/FinancialPlan';

export const FinancialPlanningModule = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        {t('financialPlanning.title')}
      </Typography>
      <Typography variant="h5" gutterBottom color="textSecondary">
        {t('financialPlanning.subtitle')}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <FinancialTips />
        </Grid>
        <Grid item xs={12} md={6}>
          <FinancialPlan />
        </Grid>
      </Grid>
    </Container>
  );
};
