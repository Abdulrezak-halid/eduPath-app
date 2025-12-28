import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CTipCard } from '@/shared/components/CTipCard';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { createElement } from '@emotion/react';

export const CStudySkillsModule = (): JSX.Element => {
  const { t } = useTranslation();

  const tips = [
    {
      id: 'effective-reading',
      title: t('studySkillsEffectiveReadingTitle'),
      description: t('studySkillsEffectiveReadingDescription'),
      icon: <MenuBookOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('studySkillsEffectiveReadingTip1'),
        t('studySkillsEffectiveReadingTip2'),
        t('studySkillsEffectiveReadingTip3'),
        t('studySkillsEffectiveReadingTip4'),
      ],
    },
    {
      id: 'note-taking',
      title: t('studySkillsNoteTakingTitle'),
      description: t('studySkillsNoteTakingDescription'),
      icon: <EditNoteOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('studySkillsNoteTakingTip1'),
        t('studySkillsNoteTakingTip2'),
        t('studySkillsNoteTakingTip3'),
        t('studySkillsNoteTakingTip4'),
      ],
    },
    {
      id: 'memory-techniques',
      title: t('studySkillsMemoryTechniquesTitle'),
      description: t('studySkillsMemoryTechniquesDescription'),
      icon: <PsychologyOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('studySkillsMemoryTechniquesTip1'),
        t('studySkillsMemoryTechniquesTip2'),
        t('studySkillsMemoryTechniquesTip3'),
        t('studySkillsMemoryTechniquesTip4'),
      ],
    },
  ];

  return (
    <CBaseModulePage
      title={t('studySkillsTitle')}
      subtitle={t('studySkillsDescription')}
      icon={createElement(LocalLibraryOutlinedIcon, { sx: { fontSize: 60 } })}
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
