import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CArticleCard } from '@/shared/components/CArticleCard';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { createElement } from '@emotion/react';

export const CUniversityLifeModule = (): JSX.Element => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'campus-life',
      title: t('universityLifeCampusLifeTitle'),
      description: t('universityLifeCampusLifeDescription'),
      icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'student-organizations',
      title: t('universityLifeStudentOrgsTitle'),
      description: t('universityLifeStudentOrgsDescription'),
      icon: <GroupsOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'time-management',
      title: t('universityLifeTimeManagementTitle'),
      description: t('universityLifeTimeManagementDescriptions'),
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <CBaseModulePage
      title={t('universityLifeTitle')}
      subtitle={t('universityLifeDescription')}
      icon={createElement(SchoolOutlinedIcon, { sx: { fontSize: 60 } })}
    >
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={4} key={article.id}>
            <CArticleCard article={article} delay={index * 0.1} />
          </Grid>
        ))}
      </Grid>
    </CBaseModulePage>
  );
};
