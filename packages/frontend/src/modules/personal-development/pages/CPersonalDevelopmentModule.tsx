import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CTipCard } from '@/shared/components/CTipCard';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { createElement } from '@emotion/react';

export const CPersonalDevelopmentModule = (): JSX.Element => {
  const { t } = useTranslation();

  const tips = [
    {
      id: 'self-improvement',
      title: t('personalDevelopmentSelfImprovementTitle'),
      description: t('personalDevelopmentSelfImprovementDescription'),
      icon: <TrendingUpOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('personalDevelopmentSelfImprovementTip1'),
        t('personalDevelopmentSelfImprovementTip2'),
        t('personalDevelopmentSelfImprovementTip3'),
        t('personalDevelopmentSelfImprovementTip4'),
      ],
    },
    {
      id: 'leadership',
      title: t('personalDevelopmentLeadershipTitle'),
      description: t('personalDevelopmentLeadershipDescription'),
      icon: <StarOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('personalDevelopmentLeadershipTip1'),
        t('personalDevelopmentLeadershipTip2'),
        t('personalDevelopmentLeadershipTip3'),
        t('personalDevelopmentLeadershipTip4'),
      ],
    },
    {
      id: 'communication',
      title: t('personalDevelopmentCommunicationTitle'),
      description: t('personalDevelopmentCommunicationDescription'),
      icon: <ChatOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('personalDevelopmentCommunicationTip1'),
        t('personalDevelopmentCommunicationTip2'),
        t('personalDevelopmentCommunicationTip3'),
        t('personalDevelopmentCommunicationTip4'),
      ],
    },
  ];

  return (
    <CBaseModulePage
      title={t('personalDevelopmentTitle')}
      subtitle={t('personalDevelopmentDescription')}
      icon={createElement(TrendingUpOutlinedIcon, { sx: { fontSize: 60 } })}
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
