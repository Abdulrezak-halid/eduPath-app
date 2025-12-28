import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CBaseModulePage } from '@/shared/components/CBaseModulePage';
import { CTipCard } from '@/shared/components/CTipCard';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { createElement } from '@emotion/react';

export const CAcademicPlanningModule = (): JSX.Element => {
  const { t } = useTranslation();

  const tips = [
    {
      id: 'course-selection',
      title: t('academicPlanningCourseSelectionTitle'),
      description: t('academicPlanningCourseSelectionDescription'),
      icon: <ListAltOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('academicPlanningCourseSelectionTip1'),
        t('academicPlanningCourseSelectionTip2'),
        t('academicPlanningCourseSelectionTip3'),
        t('academicPlanningCourseSelectionTip4'),
      ],
    },
    {
      id: 'study-schedule',
      title: t('academicPlanningStudyScheduleTitle'),
      description: t('academicPlanningStudyScheduleDescription'),
      icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('academicPlanningStudyScheduleTip1'),
        t('academicPlanningStudyScheduleTip2'),
        t('academicPlanningStudyScheduleTip3'),
        t('academicPlanningStudyScheduleTip4'),
      ],
    },
    {
      id: 'exam-preparation',
      title: t('academicPlanningExamPrepTitle'),
      description: t('academicPlanningExamPrepDescription'),
      icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
      tips: [
        t('academicPlanningExamPrepTip1'),
        t('academicPlanningExamPrepTip2'),
        t('academicPlanningExamPrepTip3'),
        t('academicPlanningExamPrepTip4'),
      ],
    },
  ];

  return (
    <CBaseModulePage
      title={t('academicPlanningTitle')}
      subtitle={t('academicPlanningDescription')}
      icon={createElement(MenuBookOutlinedIcon, { sx: { fontSize: 60 } })}
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
