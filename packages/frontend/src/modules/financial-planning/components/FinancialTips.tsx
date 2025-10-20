import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';

export const FinancialTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: <AccountBalanceWalletIcon />,
      text: t('financialPlanning.tips.budgeting'),
    },
    {
      icon: <SavingsIcon />,
      text: t('financialPlanning.tips.savings'),
    },
    {
      icon: <TipsAndUpdatesIcon />,
      text: t('financialPlanning.tips.expenses'),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('financialPlanning.tips.title')}
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