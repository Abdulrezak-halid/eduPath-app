import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  LinearProgress,
  Grid,
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface ISkillStock {
  skill: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  trend: 'up' | 'down' | 'stable';
  growth: number;
  color: string;
  icon: JSX.Element;
}

export const CSkillStocks = () => {
  const { t } = useTranslation();
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const skillStocks: ISkillStock[] = [
    {
      skill: t('skillStockLeadership'),
      category: t('skillCategoryProfessional'),
      currentLevel: 65,
      targetLevel: 100,
      trend: 'up',
      growth: 15,
      color: '#1976d2',
      icon: <StarOutlineOutlinedIcon />
    },
    {
      skill: t('skillStockCommunication'),
      category: t('skillCategoryProfessional'),
      currentLevel: 72,
      targetLevel: 100,
      trend: 'up',
      growth: 8,
      color: '#2e7d32',
      icon: <GroupsOutlinedIcon />
    },
    {
      skill: t('skillStockEmotionalIntelligence'),
      category: t('skillCategoryPersonal'),
      currentLevel: 58,
      targetLevel: 100,
      trend: 'up',
      growth: 12,
      color: '#9c27b0',
      icon: <PsychologyOutlinedIcon />
    },
    {
      skill: t('skillStockTimeManagement'),
      category: t('skillCategoryProductivity'),
      currentLevel: 80,
      targetLevel: 100,
      trend: 'stable',
      growth: 0,
      color: '#ed6c02',
      icon: <ShowChartOutlinedIcon />
    },
    {
      skill: t('skillStockCreativity'),
      category: t('skillCategoryPersonal'),
      currentLevel: 45,
      targetLevel: 100,
      trend: 'down',
      growth: -5,
      color: '#d32f2f',
      icon: <AutoAwesomeOutlinedIcon />
    },
    {
      skill: t('skillStockResilience'),
      category: t('skillCategoryPersonal'),
      currentLevel: 68,
      targetLevel: 100,
      trend: 'up',
      growth: 10,
      color: '#0288d1',
      icon: <FitnessCenterOutlinedIcon />
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUpIcon sx={{ color: '#2e7d32', fontSize: 20 }} />;
    if (trend === 'down') return <TrendingDownIcon sx={{ color: '#d32f2f', fontSize: 20 }} />;
    return <RemoveIcon sx={{ color: '#ed6c02', fontSize: 20 }} />;
  };

  const getCategoryColor = (category: string) => {
    if (category === t('skillCategoryProfessional')) return 'primary';
    if (category === t('skillCategoryPersonal')) return 'secondary';
    if (category === t('skillCategoryProductivity')) return 'warning';
    return 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {t('skillStocksTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('skillStocksSubtitle')}
          </Typography>
        </Box>
        <Chip 
          label={t('skillStocksLive')} 
          color="success" 
          size="small"
          icon={<ShowChartOutlinedIcon />}
        />
      </Box>

      <Grid container spacing={2}>
        {skillStocks.map((stock, index) => {
          const isSelected = selectedStock === stock.skill;
          const progressPercentage = (stock.currentLevel / stock.targetLevel) * 100;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={isSelected ? 6 : 2}
                onClick={() => setSelectedStock(isSelected ? null : stock.skill)}
                sx={{
                  p: 2.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  borderTop: 3,
                  borderColor: stock.color,
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: stock.color }}>
                      {stock.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {stock.skill}
                      </Typography>
                      <Chip 
                        label={stock.category}
                        size="small"
                        color={getCategoryColor(stock.category) as any}
                        sx={{ fontSize: '0.65rem', height: 18, mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                  <Tooltip title={t('skillStockTrend')}>
                    <IconButton size="small">
                      {getTrendIcon(stock.trend)}
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {t('skillStockProgress')}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: stock.color }}>
                      {stock.currentLevel}/{stock.targetLevel}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={progressPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: stock.color,
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {getTrendIcon(stock.trend)}
                    <Typography 
                      variant="caption" 
                      fontWeight="bold"
                      sx={{ 
                        color: stock.trend === 'up' ? '#2e7d32' : stock.trend === 'down' ? '#d32f2f' : '#ed6c02'
                      }}
                    >
                      {stock.growth > 0 ? '+' : ''}{stock.growth}%
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {t('skillStockThisMonth')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ mt: 3, bgcolor: 'primary.50', border: 1, borderColor: 'primary.main' }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <InfoOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="body2" color="primary.dark">
              {t('skillStocksTip')}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
