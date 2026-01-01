import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CStudyTechniques } from '../components/CStudyTechniques';
import { CStudyMethods } from '../components/CStudyMethods';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { createElement } from '@emotion/react';

export const CStudySkillsModule = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('studySkillsTitle')}
      subtitle={t('studySkillsDescription')}
      icon={createElement(LocalLibraryOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <CStudyTechniques />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CStudyMethods />
        </Grid>
      </Grid>
    </CBaseModulePage>
  );
};
