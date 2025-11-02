import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CArticleCard } from '@/shared/components/CArticleCard';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { createElement } from '@emotion/react';

export const CPersonalDevelopmentModule = (): JSX.Element => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'self-improvement',
      title: t('personalDevelopmentSelfImprovementTitle'),
      description: t('personalDevelopmentSelfImprovementDescription'),
      icon: <TrendingUpOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'leadership',
      title: t('personalDevelopmentLeadershipTitle'),
      description: t('personalDevelopmentLeadershipDescription'),
      icon: <StarOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'communication',
      title: t('personalDevelopmentCommunicationTitle'),
      description: t('personalDevelopmentCommunicationDescription'),
      icon: <ChatOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <CBaseModulePage
      title={t('personalDevelopmentTitle')}
      subtitle={t('personalDevelopmentDescription')}
      icon={createElement(TrendingUpOutlinedIcon, { sx: { fontSize: 60 } })}
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
