import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CCareerTips } from '../components/CCareerTips';
import { CCareerGuides } from '../components/CCareerGuides';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { createElement } from '@emotion/react';

export const CCareerGuidanceModule = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('careerGuidanceTitle')}
      subtitle={t('careerGuidanceDescription')}
      icon={createElement(WorkOutlineOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <CCareerTips />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CCareerGuides />
        </Grid>
      </Grid>
    </CBaseModulePage>
  );
};
