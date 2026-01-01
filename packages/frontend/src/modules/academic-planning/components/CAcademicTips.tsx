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
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

export const CAcademicTips = () => {
  const tips = [
    {
      icon: <ListAltOutlinedIcon color="primary" />,
      title: 'Course Selection Strategy',
      description: 'Research prerequisites early and balance course difficulty each semester',
      priority: 'high',
    },
    {
      icon: <CalendarMonthOutlinedIcon color="success" />,
      title: 'Time Management',
      description: 'Use time-blocking for study sessions and maintain a consistent schedule',
      priority: 'high',
    },
    {
      icon: <AutoStoriesOutlinedIcon color="info" />,
      title: 'Active Learning',
      description: 'Take notes by hand, summarize in your own words, and teach concepts to others',
      priority: 'high',
    },
    {
      icon: <GroupsOutlinedIcon color="secondary" />,
      title: 'Study Groups',
      description: 'Form small study groups (3-5 people) to discuss and review material together',
      priority: 'medium',
    },
    {
      icon: <AssessmentOutlinedIcon color="warning" />,
      title: 'Regular Assessment',
      description: 'Take practice tests weekly to identify weak areas and track progress',
      priority: 'medium',
    },
    {
      icon: <SchoolOutlinedIcon color="error" />,
      title: 'Office Hours',
      description: 'Visit professors during office hours - it improves understanding and relationships',
      priority: 'high',
    },
    {
      icon: <WorkspacePremiumOutlinedIcon color="primary" />,
      title: 'GPA Management',
      description: 'Balance challenging courses with easier ones to maintain a strong GPA',
      priority: 'medium',
    },
    {
      icon: <TipsAndUpdatesOutlinedIcon color="info" />,
      title: 'Peak Performance',
      description: 'Schedule difficult subjects during your peak concentration hours',
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
            Academic Success Tips
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Essential strategies to excel in your academic journey
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
                  label={tip.priority.toUpperCase()} 
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
