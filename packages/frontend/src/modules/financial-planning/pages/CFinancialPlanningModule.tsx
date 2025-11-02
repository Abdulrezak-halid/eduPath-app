import { Container, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CFinancialPlan } from '../components/CFinancialPlan';
import { CFinancialTips } from '../components/CFinancialTips';

export const CFinancialPlanningModule = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        {t('financialPlanningTitle')}
      </Typography>
      <Typography variant="h5" gutterBottom color="textSecondary">
        {t('financialPlanningSubtitle')}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <CFinancialTips />
        </Grid>
        <Grid item xs={12} md={6}>
          <CFinancialPlan />
        </Grid>
      </Grid>
    </Container>
  );
};
