import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CAcademicTips } from '../components/CAcademicTips';
import { CAcademicPlan } from '../components/CAcademicPlan';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { createElement } from '@emotion/react';

export const CAcademicPlanningModule = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('academicPlanningTitle')}
      subtitle={t('academicPlanningDescription')}
      icon={createElement(MenuBookOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <CAcademicTips />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CAcademicPlan />
        </Grid>
      </Grid>
    </CBaseModulePage>
  );
};
