import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { CHeroSection } from '@/shared/components/CHeroSection';

interface ICBaseModulePageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode | string;
  children?: React.ReactNode;
}

export const CBaseModulePage = ({
  title,
  subtitle,
  icon,
  children,
}: ICBaseModulePageProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CHeroSection
        title={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              textDecoration: 'none',
            }}
          >
            {typeof icon === 'string' ? icon : icon}
            <span>{title}</span>
          </Box>
        }
        subtitle={subtitle}
      />
      <Container maxWidth="lg" sx={{ py: 6, mb: 8 }}>
        <Box component="section">{children}</Box>
      </Container>
    </motion.div>
  );
};
