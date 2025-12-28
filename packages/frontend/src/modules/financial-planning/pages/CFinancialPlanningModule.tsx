import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CFinancialPlan } from '../components/CFinancialPlan';
import { CFinancialTips } from '../components/CFinancialTips';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { createElement } from '@emotion/react';

export const CFinancialPlanningModule = () => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('financialPlanningTitle')}
      subtitle={t('financialPlanningDescription')}
      icon={createElement(AccountBalanceWalletOutlinedIcon, {
        sx: { fontSize: 60 },
      })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CFinancialTips />
        </Grid>
        <Grid item xs={12} md={6}>
          <CFinancialPlan />
        </Grid>
      </Grid>
    </CBaseModulePage>
  );
};
