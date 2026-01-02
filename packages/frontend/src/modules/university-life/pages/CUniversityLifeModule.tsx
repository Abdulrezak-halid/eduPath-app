import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CCampusResources } from '../components/CCampusResources';
import { CLifeBalance } from '../components/CLifeBalance';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { createElement } from '@emotion/react';

export const CUniversityLifeModule = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CBaseModulePage
      title={t('universityLifeTitle')}
      subtitle={t('universityLifeDescription')}
      icon={createElement(SchoolOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Stack spacing={4}>
        <CCampusResources />
        <CLifeBalance />
      </Stack>
    </CBaseModulePage>
  );
};
