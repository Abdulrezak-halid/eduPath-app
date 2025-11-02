import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CArticleCard } from '@/shared/components/CArticleCard';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { createElement } from '@emotion/react';

export const CAcademicPlanningModule = (): JSX.Element => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'course-selection',
      title: t('academicPlanningCourseSelectionTitle'),
      description: t('academicPlanningCourseSelectionDescription'),
      icon: <ListAltOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'study-schedule',
      title: t('academicPlanningStudyScheduleTitle'),
      description: t('academicPlanningStudyScheduleDescription'),
      icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'exam-preparation',
      title: t('academicPlanningExamPrepTitle'),
      description: t('academicPlanningExamPrepDescription'),
      icon: <MenuBookOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <CBaseModulePage
      title={t('academicPlanningTitle')}
      subtitle={t('academicPlanningDescription')}
      icon={createElement(MenuBookOutlinedIcon, { sx: { fontSize: 60 } })}
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
