import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IModule } from '../interfaces/common';

interface ICModuleCardProps {
  module: IModule;
  delay?: number;
}

export const CModuleCard = ({
  module,
  delay = 0,
}: ICModuleCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        sx={{
          height: '100%',
          background: theme.palette.background.paper,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <CardActionArea
          component={RouterLink}
          to={module.path}
          sx={{
            height: '100%',
            p: 1,
            textDecoration: 'none',
            '& a': {
              textDecoration: 'none',
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                color: theme.palette.primary.contrastText,
                fontSize: '1.75rem',
                textDecoration: 'none',
              }}
            >
              {module.icon}
            </Box>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              {module.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              {module.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};
