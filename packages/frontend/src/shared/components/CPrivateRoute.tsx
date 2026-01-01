import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface ICPrivateRouteProps {
  children: JSX.Element;
}

export const CPrivateRoute = ({ children }: ICPrivateRouteProps): JSX.Element => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
