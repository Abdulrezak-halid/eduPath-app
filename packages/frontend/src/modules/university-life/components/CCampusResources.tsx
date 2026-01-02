import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Box,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const CCampusResources = () => {
  const { t } = useTranslation();

  const resources = [
    {
      icon: <LocalLibraryOutlinedIcon />,
      title: t('campusResourceLibrary'),
      description: t('campusResourceLibraryDesc'),
      color: '#1976d2',
      availability: t('campusResourceAvailability24'),
      category: 'academic',
    },
    {
      icon: <FitnessCenterOutlinedIcon />,
      title: t('campusResourceGym'),
      description: t('campusResourceGymDesc'),
      color: '#2e7d32',
      availability: t('campusResourceAvailability6am'),
      category: 'wellness',
    },
    {
      icon: <PsychologyOutlinedIcon />,
      title: t('campusResourceCounseling'),
      description: t('campusResourceCounselingDesc'),
      color: '#9c27b0',
      availability: t('campusResourceAvailabilityAppt'),
      category: 'wellness',
    },
    {
      icon: <RestaurantOutlinedIcon />,
      title: t('campusResourceDining'),
      description: t('campusResourceDiningDesc'),
      color: '#ed6c02',
      availability: t('campusResourceAvailability7am'),
      category: 'lifestyle',
    },
    {
      icon: <LocalHospitalOutlinedIcon />,
      title: t('campusResourceHealth'),
      description: t('campusResourceHealthDesc'),
      color: '#d32f2f',
      availability: t('campusResourceAvailabilityWkday'),
      category: 'wellness',
    },
    {
      icon: <ComputerOutlinedIcon />,
      title: t('campusResourceLabs'),
      description: t('campusResourceLabsDesc'),
      color: '#0288d1',
      availability: t('campusResourceAvailabilityWkday'),
      category: 'academic',
    },
    {
      icon: <GroupsOutlinedIcon />,
      title: t('campusResourceClubs'),
      description: t('campusResourceClubsDesc'),
      color: '#7b1fa2',
      availability: t('campusResourceAvailabilityVaries'),
      category: 'social',
    },
    {
      icon: <EventOutlinedIcon />,
      title: t('campusResourceEvents'),
      description: t('campusResourceEventsDesc'),
      color: '#c2185b',
      availability: t('campusResourceAvailabilityWeekly'),
      category: 'social',
    },
    {
      icon: <SportsEsportsOutlinedIcon />,
      title: t('campusResourceRecreation'),
      description: t('campusResourceRecreationDesc'),
      color: '#388e3c',
      availability: t('campusResourceAvailabilityDaily'),
      category: 'lifestyle',
    },
    {
      icon: <AccountBalanceOutlinedIcon />,
      title: t('campusResourceFinancial'),
      description: t('campusResourceFinancialDesc'),
      color: '#5d4037',
      availability: t('campusResourceAvailabilityWkday'),
      category: 'support',
    },
    {
      icon: <DirectionsBusOutlinedIcon />,
      title: t('campusResourceTransport'),
      description: t('campusResourceTransportDesc'),
      color: '#00796b',
      availability: t('campusResourceAvailabilityScheduled'),
      category: 'lifestyle',
    },
    {
      icon: <PrintOutlinedIcon />,
      title: t('campusResourcePrinting'),
      description: t('campusResourcePrintingDesc'),
      color: '#455a64',
      availability: t('campusResourceAvailability24'),
      category: 'academic',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'primary';
      case 'wellness': return 'secondary';
      case 'social': return 'success';
      case 'lifestyle': return 'warning';
      case 'support': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('campusResourcesTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('campusResourcesSubtitle')}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={1}
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  '& .resource-avatar': {
                    transform: 'scale(1.1)',
                  }
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Avatar 
                    className="resource-avatar"
                    sx={{ 
                      bgcolor: resource.color,
                      width: 48,
                      height: 48,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {resource.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Chip 
                      label={t(`campusCategory${resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}`)}
                      size="small"
                      color={getCategoryColor(resource.category) as any}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Tooltip title={t('campusResourceMoreInfo')}>
                    <IconButton size="small" color="primary">
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: 40 }}>
                  {resource.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500">
                    {t('campusResourceAvailable')}:
                  </Typography>
                  <Typography variant="caption" color="primary.main" fontWeight="600">
                    {resource.availability}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 1, borderLeft: 4, borderColor: 'info.main' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <InfoOutlinedIcon color="info" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {t('campusResourcesTip')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
