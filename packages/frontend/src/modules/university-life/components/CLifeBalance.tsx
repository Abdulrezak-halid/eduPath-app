import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Paper,
  Grid,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

interface IPriorityItem {
  title: string;
  description: string;
  examples: string[];
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
}

export const CLifeBalance = () => {
  const { t } = useTranslation();
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  const priorityItems: IPriorityItem[] = [
    {
      title: t('balanceUrgentImportant'),
      description: t('balanceUrgentImportantDesc'),
      examples: [
        t('balanceUrgentImportantEx1'),
        t('balanceUrgentImportantEx2'),
        t('balanceUrgentImportantEx3'),
      ],
      quadrant: 'urgent-important',
    },
    {
      title: t('balanceNotUrgentImportant'),
      description: t('balanceNotUrgentImportantDesc'),
      examples: [
        t('balanceNotUrgentImportantEx1'),
        t('balanceNotUrgentImportantEx2'),
        t('balanceNotUrgentImportantEx3'),
      ],
      quadrant: 'not-urgent-important',
    },
    {
      title: t('balanceUrgentNotImportant'),
      description: t('balanceUrgentNotImportantDesc'),
      examples: [
        t('balanceUrgentNotImportantEx1'),
        t('balanceUrgentNotImportantEx2'),
      ],
      quadrant: 'urgent-not-important',
    },
    {
      title: t('balanceNotUrgentNotImportant'),
      description: t('balanceNotUrgentNotImportantDesc'),
      examples: [
        t('balanceNotUrgentNotImportantEx1'),
        t('balanceNotUrgentNotImportantEx2'),
      ],
      quadrant: 'not-urgent-not-important',
    },
  ];

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'urgent-important': return { bg: '#ffebee', border: '#d32f2f', color: '#d32f2f' };
      case 'not-urgent-important': return { bg: '#e3f2fd', border: '#1976d2', color: '#1976d2' };
      case 'urgent-not-important': return { bg: '#fff3e0', border: '#ed6c02', color: '#ed6c02' };
      case 'not-urgent-not-important': return { bg: '#f1f8e9', border: '#689f38', color: '#689f38' };
      default: return { bg: '#f5f5f5', border: '#9e9e9e', color: '#9e9e9e' };
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'urgent-important': return <NotificationsActiveOutlinedIcon />;
      case 'not-urgent-important': return <TrendingUpIcon />;
      case 'urgent-not-important': return <ScheduleOutlinedIcon />;
      case 'not-urgent-not-important': return <FavoriteBorderOutlinedIcon />;
      default: return null;
    }
  };

  const balanceTips = [
    {
      tip: t('balanceTip1'),
      icon: <CheckCircleOutlineIcon color="success" fontSize="small" />
    },
    {
      tip: t('balanceTip2'),
      icon: <CheckCircleOutlineIcon color="success" fontSize="small" />
    },
    {
      tip: t('balanceTip3'),
      icon: <CheckCircleOutlineIcon color="success" fontSize="small" />
    },
    {
      tip: t('balanceTip4'),
      icon: <CheckCircleOutlineIcon color="success" fontSize="small" />
    },
    {
      tip: t('balanceTip5'),
      icon: <CheckCircleOutlineIcon color="success" fontSize="small" />
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('lifeBalanceTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('lifeBalanceSubtitle')}
        </Typography>
      </Box>

      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t('balanceMatrixTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('balanceMatrixSubtitle')}
          </Typography>

          <Grid container spacing={2}>
            {priorityItems.map((item, index) => {
              const colors = getQuadrantColor(item.quadrant);
              const isSelected = selectedQuadrant === item.quadrant;
              
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={isSelected ? 4 : 1}
                    onClick={() => setSelectedQuadrant(isSelected ? null : item.quadrant)}
                    sx={{
                      p: 2.5,
                      height: '100%',
                      bgcolor: colors.bg,
                      borderLeft: 4,
                      borderColor: colors.border,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <Box sx={{ color: colors.color }}>
                        {getQuadrantIcon(item.quadrant)}
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold" color={colors.color}>
                        {item.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    
                    <Divider sx={{ mb: 1.5 }} />
                    
                    <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      {t('balanceExamples')}:
                    </Typography>
                    
                    <Stack spacing={0.5}>
                      {item.examples.map((example, exIndex) => (
                        <Box key={exIndex} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: colors.color }} />
                          <Typography variant="caption" color="text.secondary">
                            {example}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t('balanceTipsTitle')}
          </Typography>
          
          <List dense>
            {balanceTips.map((item, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body2">
                      {item.tip}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
            <Typography variant="body2" color="success.dark" fontWeight="500">
              💡 {t('balanceReminder')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
