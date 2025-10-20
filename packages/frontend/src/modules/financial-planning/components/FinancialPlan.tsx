import { Card, CardContent, Typography, Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const FinancialPlan = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('financialPlanning.planning.title')}
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="financial planning tabs"
          >
            <Tab label={t('financialPlanning.planning.monthly')} />
            <Tab label={t('financialPlanning.planning.semester')} />
            <Tab label={t('financialPlanning.planning.yearly')} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {/* Monthly plan content */}
          Coming soon...
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Semester plan content */}
          Coming soon...
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Yearly plan content */}
          Coming soon...
        </TabPanel>
      </CardContent>
    </Card>
  );
};
