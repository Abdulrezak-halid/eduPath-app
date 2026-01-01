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
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export const CCareerTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: <TrendingUpOutlinedIcon color="primary" />,
      title: t('careerTipIndustryResearch'),
      description: t('careerTipIndustryResearchDesc'),
      impact: 'high',
    },
    {
      icon: <GroupsOutlinedIcon color="success" />,
      title: t('careerTipNetworking'),
      description: t('careerTipNetworkingDesc'),
      impact: 'high',
    },
    {
      icon: <BusinessCenterOutlinedIcon color="warning" />,
      title: t('careerTipInternships'),
      description: t('careerTipInternshipsDesc'),
      impact: 'high',
    },
    {
      icon: <SchoolOutlinedIcon color="info" />,
      title: t('careerTipSkillDevelopment'),
      description: t('careerTipSkillDevelopmentDesc'),
      impact: 'medium',
    },
    {
      icon: <HandshakeOutlinedIcon color="secondary" />,
      title: t('careerTipInterviewPrep'),
      description: t('careerTipInterviewPrepDesc'),
      impact: 'high',
    },
    {
      icon: <EditNoteOutlinedIcon color="error" />,
      title: t('careerTipResume'),
      description: t('careerTipResumeDesc'),
      impact: 'high',
    },
    {
      icon: <StarOutlineOutlinedIcon color="primary" />,
      title: t('careerTipPersonalBrand'),
      description: t('careerTipPersonalBrandDesc'),
      impact: 'medium',
    },
    {
      icon: <WorkOutlineOutlinedIcon color="success" />,
      title: t('careerTipJobSearch'),
      description: t('careerTipJobSearchDesc'),
      impact: 'medium',
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WorkOutlineOutlinedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('careerTipsTitle')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('careerTipsSubtitle')}
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
                  label={t(`impact${tip.impact.charAt(0).toUpperCase() + tip.impact.slice(1)}`)} 
                  size="small" 
                  color={getImpactColor(tip.impact) as any}
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
