import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { CBackButton } from './CBackButton';
import { useLocation } from 'react-router-dom';

interface ICHeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  children?: React.ReactNode;
}

const HeroWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/patterns/hero-pattern.svg")',
    opacity: 0.1,
    zIndex: 1,
  },
}));

const ContentWrapper = styled(Container)(({}) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
}));

export const CHeroSection = ({
  title,
  subtitle,
  children,
}: ICHeroSectionProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  return (
    <HeroWrapper sx={{ position: 'relative' }}>
      {showBackButton && <CBackButton />}
      <ContentWrapper maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              marginBottom: theme.spacing(2),
            }}
          >
            {title}
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: theme.spacing(4),
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </ContentWrapper>
    </HeroWrapper>
  );
};
