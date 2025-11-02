import { Box, Button, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CHeroSection } from '@/shared/components/CHeroSection';
import { CArticleCard } from '@/shared/components/CArticleCard';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

export const CAdvicePage = (): JSX.Element => {
  const { t } = useTranslation();

  const advice = [
    {
      id: 'time-management',
      title: t('adviceTimeManagementTitle'),
      description: t('adviceTimeManagementDescription'),
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'study-balance',
      title: t('adviceStudyBalanceTitle'),
      description: t('adviceStudyBalanceDescription'),
      icon: <BalanceOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'stress-management',
      title: t('adviceStressManagementTitle'),
      description: t('adviceStressManagementDescription'),
      icon: <SpaOutlinedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <CHeroSection
        title={t('adviceTitle')}
        subtitle={t('adviceSubtitle')}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4 }}
        >
          {t('adviceShareAdvice')}
        </Button>
      </CHeroSection>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          {advice.map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <CArticleCard
                article={item}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};