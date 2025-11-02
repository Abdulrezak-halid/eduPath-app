import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CArticleCard } from '@/shared/components/CArticleCard';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

import { createElement } from '@emotion/react';

export const CStudySkillsModule = (): JSX.Element => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'effective-reading',
      title: t('studySkillsEffectiveReadingTitle'),
      description: t('studySkillsEffectiveReadingDescription'),
      icon: <MenuBookOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'note-taking',
      title: t('studySkillsNoteTakingTitle'),
      description: t('studySkillsNoteTakingDescription'),
      icon: <EditNoteOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'memory-techniques',
      title: t('studySkillsMemoryTechniquesTitle'),
      description: t('studySkillsMemoryTechniquesDescription'),
      icon: <PsychologyOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <CBaseModulePage
      title={t('studySkillsTitle')}
      subtitle={t('studySkillsDescription')}
      icon={createElement(LocalLibraryOutlinedIcon, { sx: { fontSize: 60 } })}
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
