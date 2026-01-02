import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CSkillStocks } from '../components/CSkillStocks';
import { CPathsAndChallenges } from '../components/CPathsAndChallenges';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { createElement } from '@emotion/react';

export const CPersonalDevelopmentModule = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('personalDevelopmentTitle')}
      subtitle={t('personalDevelopmentDescription')}
      icon={createElement(TrendingUpOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Stack spacing={4}>
        <CSkillStocks />
        <CPathsAndChallenges />
      </Stack>
    </CBaseModulePage>
  );
};
