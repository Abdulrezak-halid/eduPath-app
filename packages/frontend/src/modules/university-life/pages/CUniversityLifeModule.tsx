import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CTipCard } from '@/shared/components/CTipCard';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { createElement } from '@emotion/react';

export const CUniversityLifeModule = (): JSX.Element => {
  const { t } = useTranslation();

  const tips = [
    {
      id: 'campus-life',
      title: t('universityLifeCampusLifeTitle'),
      description: t('universityLifeCampusLifeDescription'),
      icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('universityLifeCampusLifeTip1'),
        t('universityLifeCampusLifeTip2'),
        t('universityLifeCampusLifeTip3'),
        t('universityLifeCampusLifeTip4'),
      ],
    },
    {
      id: 'student-organizations',
      title: t('universityLifeStudentOrgsTitle'),
      description: t('universityLifeStudentOrgsDescription'),
      icon: <GroupsOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('universityLifeStudentOrgsTip1'),
        t('universityLifeStudentOrgsTip2'),
        t('universityLifeStudentOrgsTip3'),
        t('universityLifeStudentOrgsTip4'),
      ],
    },
    {
      id: 'time-management',
      title: t('universityLifeTimeManagementTitle'),
      description: t('universityLifeTimeManagementDescription'),
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('universityLifeTimeManagementTip1'),
        t('universityLifeTimeManagementTip2'),
        t('universityLifeTimeManagementTip3'),
        t('universityLifeTimeManagementTip4'),
      ],
    },
  ];

  return (
    <CBaseModulePage
      title={t('universityLifeTitle')}
      subtitle={t('universityLifeDescription')}
      icon={createElement(SchoolOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Grid container spacing={3}>
        {tips.map((tip, index) => (
          <Grid item xs={12} md={4} key={tip.id}>
            <CTipCard
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
              tips={tip.tips}
              delay={index * 0.1}
            />
          </Grid>
        ))}
      </Grid>
    </CBaseModulePage>
  );
};
