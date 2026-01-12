import { useState, FormEvent } from 'react';
import {
  Container,
  Box,
  Typography,
  Link,
  Alert,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CButton, CTextField } from '@/base/components';
import { useAuth } from '@/shared/contexts/AuthContext';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const CLogin = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(t('authPleaseEnterEmailPassword'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err);
      setError(t('authFailedToLogin'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {t('authSignIn')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('authSignInSubtitle')}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <CTextField
              label={t('authEmail')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
              autoFocus
              disabled={loading}
              sx={{ mb: 2 }}
            />
            
            <CTextField
              label={t('authPassword')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <CButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {t('authSignIn')}
            </CButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{ display: 'block', mb: 1 }}
              >
                {t('authForgotPassword')}
              </Link>
              
              <Typography variant="body2" color="text.secondary">
                {t('authDontHaveAccount')}{' '}
                <Link component={RouterLink} to="/signup" fontWeight={600}>
                  {t('authSignUp')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
