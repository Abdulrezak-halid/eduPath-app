import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ICTipCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tips: string[];
  delay?: number;
}

export const CTipCard = ({
  icon,
  title,
  description,
  tips,
  delay = 0,
}: ICTipCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        sx={{
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              color: 'primary.main',
            }}
          >
            {icon}
            <Typography variant="h5" component="h3" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.7 }}
          >
            {description}
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
            {tips.map((tip, index) => (
              <Typography
                key={index}
                component="li"
                variant="body2"
                sx={{ mb: 1, lineHeight: 1.6 }}
              >
                {tip}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
