import { Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';

interface IArticle {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ICArticleCardProps {
  article: IArticle;
  delay?: number;
}

export const CArticleCard = ({ article, delay = 0 }: ICArticleCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card 
        sx={{ 
          height: '100%',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 8px 24px ${theme.palette.action.hover}`,
          },
        }}
      >
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                {article.icon}
              </Box>
              <Typography variant="h6" component="h3" color="primary.main">
                {article.title}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {article.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};