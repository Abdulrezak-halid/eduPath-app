import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { getModules } from '@/shared/constants/modules';
import { CModuleCard } from '@/shared/components/CModuleCard';

export const CHomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const modules = getModules(t);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('homeHeroTitle')}
          </Typography>
          <Typography variant="h5" paragraph>
            {t('homeHeroSubtitle')}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to="/advice"
              variant="outlined"
              color="inherit"
              sx={{ mx: 1, textDecoration: 'none' }}
            >
              {t('viewTips')}
            </Button>
            <Button
              component={RouterLink}
              to={modules[0].path}
              variant="contained"
              color="info"
              sx={{ mx: 1, textDecoration: 'none' }}
            >
              {t('startJourney')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Modules Section */}
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {t('homeModulesTitle')}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          align="center"
          color="text.secondary"
          paragraph
        >
          {t('homeModulesSubtitle')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              <CModuleCard module={module} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
