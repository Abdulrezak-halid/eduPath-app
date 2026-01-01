import { 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`plan-tabpanel-${index}`}
      aria-labelledby={`plan-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface IBudgetItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export const CFinancialPlan = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const monthlyBudget: IBudgetItem[] = [
    { category: 'Housing (Rent/Dorm)', amount: 500, percentage: 40, color: '#1976d2' },
    { category: 'Food & Groceries', amount: 250, percentage: 20, color: '#2e7d32' },
    { category: 'Transportation', amount: 100, percentage: 8, color: '#ed6c02' },
    { category: 'Books & Supplies', amount: 75, percentage: 6, color: '#9c27b0' },
    { category: 'Personal & Entertainment', amount: 125, percentage: 10, color: '#d32f2f' },
    { category: 'Savings', amount: 200, percentage: 16, color: '#0288d1' },
  ];

  const semesterBudget: IBudgetItem[] = [
    { category: 'Tuition & Fees', amount: 5000, percentage: 62, color: '#1976d2' },
    { category: 'Housing (4 months)', amount: 2000, percentage: 25, color: '#2e7d32' },
    { category: 'Books & Materials', amount: 400, percentage: 5, color: '#9c27b0' },
    { category: 'Food & Living', amount: 500, percentage: 6, color: '#ed6c02' },
    { category: 'Emergency Fund', amount: 150, percentage: 2, color: '#0288d1' },
  ];

  const yearlyBudget: IBudgetItem[] = [
    { category: 'Tuition (2 semesters)', amount: 10000, percentage: 50, color: '#1976d2' },
    { category: 'Housing (12 months)', amount: 6000, percentage: 30, color: '#2e7d32' },
    { category: 'Food & Groceries', amount: 2400, percentage: 12, color: '#ed6c02' },
    { category: 'Books & Supplies', amount: 800, percentage: 4, color: '#9c27b0' },
    { category: 'Savings & Emergency', amount: 800, percentage: 4, color: '#0288d1' },
  ];

  const totalMonthly = monthlyBudget.reduce((sum, item) => sum + item.amount, 0);
  const totalSemester = semesterBudget.reduce((sum, item) => sum + item.amount, 0);
  const totalYearly = yearlyBudget.reduce((sum, item) => sum + item.amount, 0);

  const renderBudgetTable = (budget: IBudgetItem[], total: number) => (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        These are average estimates. Adjust amounts based on your location and lifestyle.
      </Alert>
      
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Amount ($)</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Percentage</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Distribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budget.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: item.color 
                      }} 
                    />
                    <Typography variant="body2" fontWeight="500">
                      {item.category}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="600">
                    ${item.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip label={`${item.percentage}%`} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell align="right" sx={{ width: 150 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.percentage} 
                      sx={{ 
                        flexGrow: 1, 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.color
                        }
                      }} 
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  ${total.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip label="100%" size="small" color="primary" />
              </TableCell>
              <TableCell align="right">
                <CheckCircleOutlineIcon color="success" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('financialPlanningTitle')}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sample budget templates to help plan your student finances
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={t('financialPlanningPlanMonthly')} />
            <Tab label={t('financialPlanningPlanSemester')} />
            <Tab label={t('financialPlanningPlanYearly')} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          {renderBudgetTable(monthlyBudget, totalMonthly)}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          {renderBudgetTable(semesterBudget, totalSemester)}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          {renderBudgetTable(yearlyBudget, totalYearly)}
        </TabPanel>
      </CardContent>
    </Card>
  );
};
