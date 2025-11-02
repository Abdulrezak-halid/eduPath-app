import { Box, Button, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CHeroSection } from '@/shared/components/CHeroSection';
import { CArticleCard } from '@/shared/components/CArticleCard';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

export const CQuestionsPage = (): JSX.Element => {
  const { t } = useTranslation();

  const questions = [
    {
      id: 'study-methods',
      title: t('questionsStudyMethodsTitle'),
      description: t('questionsStudyMethodsDescription'),
      icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'social-life',
      title: t('questionsSocialLifeTitle'),
      description: t('questionsSocialLifeDescription'),
      icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'career-choice',
      title: t('questionsCareerChoiceTitle'),
      description: t('questionsCareerChoiceDescription'),
      icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <CHeroSection
        title={t('questionsTitle')}
        subtitle={t('questionsSubtitle')}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4 }}
        >
          {t('questionsAskQuestion')}
        </Button>
      </CHeroSection>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          {questions.map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <CArticleCard
                article={item}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};