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
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export const CStudyTechniques = () => {
  const { t } = useTranslation();

  const techniques = [
    {
      icon: <MenuBookOutlinedIcon color="primary" />,
      title: t('studyTechniqueSq3r'),
      description: t('studyTechniqueSq3rDesc'),
      difficulty: 'intermediate',
    },
    {
      icon: <EditNoteOutlinedIcon color="success" />,
      title: t('studyTechniqueCornell'),
      description: t('studyTechniqueCornellDesc'),
      difficulty: 'easy',
    },
    {
      icon: <ColorLensOutlinedIcon color="warning" />,
      title: t('studyTechniquePomodoro'),
      description: t('studyTechniquePomodoroDesc'),
      difficulty: 'easy',
    },
    {
      icon: <PsychologyOutlinedIcon color="secondary" />,
      title: t('studyTechniqueMemoryPalace'),
      description: t('studyTechniqueMemoryPalaceDesc'),
      difficulty: 'advanced',
    },
    {
      icon: <AutoStoriesOutlinedIcon color="info" />,
      title: t('studyTechniqueMindMapping'),
      description: t('studyTechniqueMindMappingDesc'),
      difficulty: 'easy',
    },
    {
      icon: <RepeatOutlinedIcon color="error" />,
      title: t('studyTechniqueSpacedRepetition'),
      description: t('studyTechniqueSpacedRepetitionDesc'),
      difficulty: 'intermediate',
    },
    {
      icon: <SchoolOutlinedIcon color="primary" />,
      title: t('studyTechniqueFeynman'),
      description: t('studyTechniqueFeynmanDesc'),
      difficulty: 'intermediate',
    },
    {
      icon: <LightbulbOutlinedIcon color="warning" />,
      title: t('studyTechniqueActiveRecall'),
      description: t('studyTechniqueActiveRecallDesc'),
      difficulty: 'easy',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LightbulbOutlinedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('studyTechniquesTitle')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('studyTechniquesSubtitle')}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {techniques.map((technique, index) => (
            <ListItem 
              key={index}
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                py: 2,
                borderBottom: index < techniques.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {technique.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" fontWeight="600">
                      {technique.title}
                    </Typography>
                  }
                />
                <Chip 
                  label={t(`difficulty${technique.difficulty.charAt(0).toUpperCase() + technique.difficulty.slice(1)}`)} 
                  size="small" 
                  color={getDifficultyColor(technique.difficulty) as any}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                {technique.description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
