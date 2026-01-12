import { useState, FormEvent } from 'react';
import {
  Container,
  Box,
  Typography,
  Link,
  Alert,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CButton, CTextField } from '@/base/components';
import { useAuth } from '@/shared/contexts/AuthContext';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export const CForgotPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError(t('authPleaseEnterEmail'));
      return;
    }

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage(t('authPasswordResetEmailSent'));
    } catch (err) {
      console.error('Password reset error:', err);
      setError(t('authFailedToResetPassword'));
    } finally {
      setLoading(false);
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
              <EmailOutlinedIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {t('authResetPassword')}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {t('authResetPasswordSubtitle')}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
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

            <CButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {t('authSendResetLink')}
            </CButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                fontWeight={600}
              >
                {t('authBackToLogin')}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
