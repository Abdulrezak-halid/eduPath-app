import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export const CFinancialTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: <AccountBalanceWalletOutlinedIcon />,
      text: t('financialPlanningTipsBudgeting'),
    },
    {
      icon: <SavingsOutlinedIcon />,
      text: t('financialPlanningTipsSavings'),
    },
    {
      icon: <TipsAndUpdatesOutlinedIcon />,
      text: t('financialPlanningTipsExpenses'),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('financialPlanningTipsTitle')}
        </Typography>
        <List>
          {tips.map((tip, index) => (
            <ListItem key={index}>
              <ListItemIcon>{tip.icon}</ListItemIcon>
              <ListItemText primary={tip.text} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};