import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

export const CAcademicTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: <ListAltOutlinedIcon color="primary" />,
      title: t('academicTipCourseSelection'),
      description: t('academicTipCourseSelectionDesc'),
      priority: 'high',
    },
    {
      icon: <CalendarMonthOutlinedIcon color="success" />,
      title: t('academicTipTimeManagement'),
      description: t('academicTipTimeManagementDesc'),
      priority: 'high',
    },
    {
      icon: <AutoStoriesOutlinedIcon color="info" />,
      title: t('academicTipActiveLearning'),
      description: t('academicTipActiveLearningDesc'),
      priority: 'high',
    },
    {
      icon: <GroupsOutlinedIcon color="secondary" />,
      title: t('academicTipStudyGroups'),
      description: t('academicTipStudyGroupsDesc'),
      priority: 'medium',
    },
    {
      icon: <AssessmentOutlinedIcon color="warning" />,
      title: t('academicTipRegularAssessment'),
      description: t('academicTipRegularAssessmentDesc'),
      priority: 'medium',
    },
    {
      icon: <SchoolOutlinedIcon color="error" />,
      title: t('academicTipOfficeHours'),
      description: t('academicTipOfficeHoursDesc'),
      priority: 'high',
    },
    {
      icon: <WorkspacePremiumOutlinedIcon color="primary" />,
      title: t('academicTipGpaManagement'),
      description: t('academicTipGpaManagementDesc'),
      priority: 'medium',
    },
    {
      icon: <TipsAndUpdatesOutlinedIcon color="info" />,
      title: t('academicTipPeakPerformance'),
      description: t('academicTipPeakPerformanceDesc'),
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TipsAndUpdatesOutlinedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('academicTipsTitle')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('academicTipsSubtitle')}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {tips.map((tip, index) => (
            <ListItem 
              key={index}
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                py: 2,
                borderBottom: index < tips.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {tip.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" fontWeight="600">
                      {tip.title}
                    </Typography>
                  }
                />
                <Chip 
                  label={t(`priority${tip.priority.charAt(0).toUpperCase() + tip.priority.slice(1)}`)} 
                  size="small" 
                  color={getPriorityColor(tip.priority) as any}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                {tip.description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
