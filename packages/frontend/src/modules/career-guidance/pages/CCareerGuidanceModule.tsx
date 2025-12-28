import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CTipCard } from '@/shared/components/CTipCard';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { createElement } from '@emotion/react';

export const CCareerGuidanceModule = (): JSX.Element => {
  const { t } = useTranslation();

  const tips = [
    {
      id: 'career-paths',
      title: t('careerGuidanceCareerPathsTitle'),
      description: t('careerGuidanceCareerPathsDescription'),
      icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('careerGuidanceCareerPathsTip1'),
        t('careerGuidanceCareerPathsTip2'),
        t('careerGuidanceCareerPathsTip3'),
        t('careerGuidanceCareerPathsTip4'),
      ],
    },
    {
      id: 'interview-tips',
      title: t('careerGuidanceInterviewTipsTitle'),
      description: t('careerGuidanceInterviewTipsDescription'),
      icon: <HandshakeOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('careerGuidanceInterviewTipsTip1'),
        t('careerGuidanceInterviewTipsTip2'),
        t('careerGuidanceInterviewTipsTip3'),
        t('careerGuidanceInterviewTipsTip4'),
      ],
    },
    {
      id: 'resume-writing',
      title: t('careerGuidanceResumeWritingTitle'),
      description: t('careerGuidanceResumeWritingDescription'),
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('careerGuidanceResumeWritingTip1'),
        t('careerGuidanceResumeWritingTip2'),
        t('careerGuidanceResumeWritingTip3'),
        t('careerGuidanceResumeWritingTip4'),
      ],
    },
  ];

  return (
    <CBaseModulePage
      title={t('careerGuidanceTitle')}
      subtitle={t('careerGuidanceDescription')}
      icon={createElement(WorkOutlineOutlinedIcon, { sx: { fontSize: 60 } })}
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
