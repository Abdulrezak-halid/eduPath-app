import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

interface ICMainLayoutProps {
  children: React.ReactNode;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
  backgroundColor: theme.palette.grey[50],
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const CMainLayout = ({ children }: ICMainLayoutProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLangClose = (): void => {
    setLangAnchorEl(null);
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    handleLangClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="sticky" color="default">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src="/Edu Path - logo.png"
                  alt="EduPath"
                  style={{
                    height: '80px',
                    width: 'auto',
                    marginRight: theme.spacing(1),
                  }}
                />
              </Box>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isMobile ? (
                <IconButton
                  size="large"
                  edge="end"
                  color="primary"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              ) : (
                <>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <MenuItem
                      component={RouterLink}
                      to="/advice"
                      onClick={handleClose}
                    >
                      {t('navigationAdvice')}
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/questions"
                      onClick={handleClose}
                    >
                      {t('navigationQuestions')}
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/about"
                      onClick={handleClose}
                    >
                      {t('navigationAbout')}
                    </MenuItem>
                    <IconButton
                      size="large"
                      color="primary"
                      onClick={handleLangMenu}
                    >
                      <TranslateOutlinedIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </motion.div>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <AnimatePresence>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem component={RouterLink} to="/advice" onClick={handleClose}>
            {t('navigation.advice')}
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/questions"
            onClick={handleClose}
          >
            {t('navigationQuestions')}
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/about"
            onClick={handleClose}
          >
            {t('navigationAbout')}
          </MenuItem>
        </Menu>

        <Menu
          id="language-menu"
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleLangClose}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('tr')}>Türkçe</MenuItem>
        </Menu>
      </AnimatePresence>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>

      <StyledFooter>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()}  {t('EduPath')}. {t('footerRights')}
          </Typography>
        </Container>
      </StyledFooter>
    </Box>
  );
};
