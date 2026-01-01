/**
 * CSignup
 * 
 * User registration page with email/password
 */

import { useState, FormEvent } from 'react';
import {
  Container,
  Box,
  Typography,
  Link,
  Alert,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CButton, CTextField } from '@/base/components';
import { useAuth } from '@/shared/contexts/AuthContext';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

export const CSignup = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.displayName || !formData.email || !formData.password) {
      setError(t('authPleaseEnterAllFields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('authPasswordsDoNotMatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('authPasswordTooShort'));
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await signup(formData.email, formData.password, formData.displayName);
      setLoading(false);
      navigate('/', { replace: true });
    } catch (err: any) {
      setLoading(false);
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError(t('authEmailAlreadyInUse'));
      } else if (err.code === 'auth/invalid-email') {
        setError(t('authInvalidEmail'));
      } else {
        setError(t('authFailedToCreateAccount'));
      }
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
                bgcolor: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <PersonAddOutlinedIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {t('authSignUp')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('authSignUpSubtitle')}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <CTextField
              label={t('authDisplayName')}
              value={formData.displayName}
              onChange={handleChange('displayName')}
              required
              fullWidth
              autoFocus
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <CTextField
              label={t('authEmail')}
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              fullWidth
              autoComplete="email"
              disabled={loading}
              sx={{ mb: 2 }}
            />
            
            <CTextField
              label={t('authPassword')}
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              required
              fullWidth
              autoComplete="new-password"
              disabled={loading}
              helperText={t('authPasswordMinLength')}
              sx={{ mb: 2 }}
            />

            <CTextField
              label={t('authConfirmPassword')}
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
              fullWidth
              autoComplete="new-password"
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <CButton
              type="submit"
              variant="secondary"
              fullWidth
              loading={loading}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {t('authCreateAccount')}
            </CButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('authAlreadyHaveAccount')}{' '}
                <Link component={RouterLink} to="/login" fontWeight={600}>
                  {t('authSignIn')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
