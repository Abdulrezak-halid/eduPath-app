import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CHeroSection } from '@/shared/components/CHeroSection';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { motion } from 'framer-motion';

export const CAboutPage = (): JSX.Element => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'mission',
      title: t('aboutMissionTitle'),
      description: t('aboutMissionDescription'),
      icon: <FlagOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'vision',
      title: t('aboutVisionTitle'),
      description: t('aboutVisionDescription'),
      icon: <VisibilityOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <CHeroSection
        title={t('aboutTitle')}
        subtitle={t('aboutSubtitle')}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={section.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[4],
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: 'primary.contrastText',
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
                  >
                    {section.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};