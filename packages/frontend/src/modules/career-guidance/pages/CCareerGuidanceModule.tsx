import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CArticleCard } from '@/shared/components/CArticleCard';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { createElement } from '@emotion/react';

export const CCareerGuidanceModule = (): JSX.Element => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'career-paths',
      title: t('careerGuidanceCareerPathsTitle'),
      description: t('careerGuidanceCareerPathsDescription'),
      icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'interview-tips',
      title: t('careerGuidanceInterviewTipsTitle'),
      description: t('careerGuidanceInterviewTipsDescription'),
      icon: <HandshakeOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'resume-writing',
      title: t('careerGuidanceResumeWritingTitle'),
      description: t('careerGuidanceResumeWritingDescription'),
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <CBaseModulePage
      title={t('careerGuidanceTitle')}
      subtitle={t('careerGuidanceDescription')}
      icon={createElement(WorkOutlineOutlinedIcon, { sx: { fontSize: 60 } })}
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
