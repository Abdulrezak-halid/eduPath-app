import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

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

      {/* About Us Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t('aboutTitle')}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          >
            {t('aboutSubtitle')}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  <FlagOutlinedIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h4" component="h3">
                    {t('aboutMissionTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
                >
                  {t('aboutMissionDescription')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h4" component="h3">
                    {t('aboutVisionTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
                >
                  {t('aboutVisionDescription')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
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

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 6,
          mt: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {t('footerAboutTitle')}
              </Typography>
              <Typography variant="body2">
                {t('footerAboutDescription')}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <IconButton
                  component={Link}
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: 'primary.contrastText' }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: 'primary.contrastText' }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: 'primary.contrastText' }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: 'primary.contrastText' }}
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {t('footerQuickLinksTitle')}
              </Typography>
              <Stack spacing={1}>
                <Link
                  component={RouterLink}
                  to="/advice"
                  sx={{ color: 'primary.contrastText', textDecoration: 'none' }}
                >
                  {t('viewTips')}
                </Link>
                {modules.map((module) => (
                  <Link
                    key={module.id}
                    component={RouterLink}
                    to={module.path}
                    sx={{
                      color: 'primary.contrastText',
                      textDecoration: 'none',
                    }}
                  >
                    {module.title}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {t('footerContactTitle')}
              </Typography>
              <Typography variant="body2" paragraph>
                {t('footerContactEmail')}
              </Typography>
              <Typography variant="body2">{t('footerContactPhone')}</Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 4, borderTop: 1, borderColor: 'primary.light', pt: 2 }}
          >
            © {new Date().getFullYear()} EduPath. {t('footerRightsReserved')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
