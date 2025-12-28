/**
 * CLoading
 * 
 * Base loading component
 */

import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export interface ICLoadingProps {
  message?: string;
  size?: number;
}

export const CLoading: FC<ICLoadingProps> = ({ message, size = 40 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
      gap={2}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};
