import { 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`method-tabpanel-${index}`}
      aria-labelledby={`method-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface IMethodStep {
  label: string;
  description: string;
  tip?: string;
}

export const CStudyMethods = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const sq3rSteps: IMethodStep[] = [
    {
      label: t('studyMethodSq3rStep1'),
      description: t('studyMethodSq3rStep1Desc'),
      tip: t('studyMethodSq3rStep1Tip')
    },
    {
      label: t('studyMethodSq3rStep2'),
      description: t('studyMethodSq3rStep2Desc'),
      tip: t('studyMethodSq3rStep2Tip')
    },
    {
      label: t('studyMethodSq3rStep3'),
      description: t('studyMethodSq3rStep3Desc'),
      tip: t('studyMethodSq3rStep3Tip')
    },
    {
      label: t('studyMethodSq3rStep4'),
      description: t('studyMethodSq3rStep4Desc'),
      tip: t('studyMethodSq3rStep4Tip')
    },
    {
      label: t('studyMethodSq3rStep5'),
      description: t('studyMethodSq3rStep5Desc'),
      tip: t('studyMethodSq3rStep5Tip')
    },
  ];

  const cornellSteps: IMethodStep[] = [
    {
      label: t('studyMethodCornellStep1'),
      description: t('studyMethodCornellStep1Desc'),
      tip: t('studyMethodCornellStep1Tip')
    },
    {
      label: t('studyMethodCornellStep2'),
      description: t('studyMethodCornellStep2Desc'),
      tip: t('studyMethodCornellStep2Tip')
    },
    {
      label: t('studyMethodCornellStep3'),
      description: t('studyMethodCornellStep3Desc'),
      tip: t('studyMethodCornellStep3Tip')
    },
    {
      label: t('studyMethodCornellStep4'),
      description: t('studyMethodCornellStep4Desc'),
      tip: t('studyMethodCornellStep4Tip')
    },
    {
      label: t('studyMethodCornellStep5'),
      description: t('studyMethodCornellStep5Desc'),
      tip: t('studyMethodCornellStep5Tip')
    },
  ];

  const memorySteps: IMethodStep[] = [
    {
      label: t('studyMethodMemoryStep1'),
      description: t('studyMethodMemoryStep1Desc'),
      tip: t('studyMethodMemoryStep1Tip')
    },
    {
      label: t('studyMethodMemoryStep2'),
      description: t('studyMethodMemoryStep2Desc'),
      tip: t('studyMethodMemoryStep2Tip')
    },
    {
      label: t('studyMethodMemoryStep3'),
      description: t('studyMethodMemoryStep3Desc'),
      tip: t('studyMethodMemoryStep3Tip')
    },
    {
      label: t('studyMethodMemoryStep4'),
      description: t('studyMethodMemoryStep4Desc'),
      tip: t('studyMethodMemoryStep4Tip')
    },
    {
      label: t('studyMethodMemoryStep5'),
      description: t('studyMethodMemoryStep5Desc'),
      tip: t('studyMethodMemoryStep5Tip')
    },
  ];

  const renderMethodSteps = (steps: IMethodStep[], methodName: string) => (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        {t('studyMethodAlertFollow', { method: methodName })}
      </Alert>
      
      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} active={true} completed={false}>
            <StepLabel>
              <Typography variant="subtitle1" fontWeight="bold">
                {t('studyMethodStep', { number: index + 1 })}: {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {step.description}
                </Typography>
                {step.tip && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 18, mt: 0.3 }} />
                    <Typography variant="body2" color="success.main" fontStyle="italic">
                      <strong>{t('studyMethodTip')}</strong> {step.tip}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CheckCircleOutlineIcon color="primary" />
          <Typography variant="subtitle2" fontWeight="bold" color="primary">
            {t('studyMethodCompleteAll', { count: steps.length })}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {t('studyMethodPracticeHabit')}
        </Typography>
      </Box>
    </>
  );

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            {t('studyMethodsTitle')}
          </Typography>
          <Chip label={t('studyMethodsCount', { count: 3 })} color="primary" size="small" />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('studyTechniquesSubtitle')}
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={t('studyMethodTabSq3r')} />
            <Tab label={t('studyMethodTabCornell')} />
            <Tab label={t('studyMethodTabMemory')} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          {renderMethodSteps(sq3rSteps, t('studyMethodTabSq3r'))}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          {renderMethodSteps(cornellSteps, t('studyMethodTabCornell'))}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          {renderMethodSteps(memorySteps, t('studyMethodTabMemory'))}
        </TabPanel>
      </CardContent>
    </Card>
  );
};
