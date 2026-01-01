import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

export const CFinancialTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
      title: t('financialPlanningTipsBudgeting'),
      description: 'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
      priority: 'high',
    },
    {
      icon: <SavingsOutlinedIcon color="success" />,
      title: t('financialPlanningTipsSavings'),
      description: 'Save at least 10-20% of any income or allowance you receive',
      priority: 'high',
    },
    {
      icon: <ReceiptLongOutlinedIcon color="info" />,
      title: t('financialPlanningTipsExpenses'),
      description: 'Track every expense for at least one month to understand spending habits',
      priority: 'medium',
    },
    {
      icon: <SchoolOutlinedIcon color="secondary" />,
      title: 'Student Discounts',
      description: 'Always ask for student discounts - they can save you 10-50%',
      priority: 'medium',
    },
    {
      icon: <RestaurantOutlinedIcon color="warning" />,
      title: 'Meal Planning',
      description: 'Cook at home and meal prep to save $100-200 per month',
      priority: 'medium',
    },
    {
      icon: <CreditCardOutlinedIcon color="error" />,
      title: 'Avoid Debt',
      description: 'Avoid credit card debt - interest rates can be 15-25% annually',
      priority: 'high',
    },
    {
      icon: <LocalAtmOutlinedIcon color="primary" />,
      title: 'Emergency Fund',
      description: 'Build an emergency fund of at least 3 months expenses',
      priority: 'high',
    },
    {
      icon: <TipsAndUpdatesOutlinedIcon color="info" />,
      title: 'Smart Shopping',
      description: 'Use cashback apps, buy used textbooks, and share subscriptions',
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TipsAndUpdatesOutlinedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('financialPlanningTipsTitle')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Essential financial tips for students to manage money effectively
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {tips.map((tip, index) => (
            <ListItem 
              key={index}
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                py: 2,
                borderBottom: index < tips.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {tip.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" fontWeight="600">
                      {tip.title}
                    </Typography>
                  }
                />
                <Chip 
                  label={tip.priority.toUpperCase()} 
                  size="small" 
                  color={getPriorityColor(tip.priority) as any}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                {tip.description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};