import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const CBackButton = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        position: 'absolute',
        left: { xs: 16, md: 32 },
        top: { xs: 16, md: 32 },
        color: 'primary.contrastText',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.2)',
        },
        zIndex: 1,
      }}
      aria-label={t('back')}
    >
      <ArrowBackOutlinedIcon />
    </IconButton>
  );
};