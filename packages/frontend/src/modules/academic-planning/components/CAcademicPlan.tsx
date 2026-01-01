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

interface IAcademicItem {
  activity: string;
  hours: number;
  percentage: number;
  color: string;
}

export const CAcademicPlan = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const weeklySchedule: IAcademicItem[] = [
    { activity: t('academicPlanActivityClasses'), hours: 15, percentage: 25, color: '#1976d2' },
    { activity: t('academicPlanActivitySelfStudy'), hours: 20, percentage: 33, color: '#2e7d32' },
    { activity: t('academicPlanActivityAssignments'), hours: 10, percentage: 17, color: '#ed6c02' },
    { activity: t('academicPlanActivityGroupStudy'), hours: 5, percentage: 8, color: '#9c27b0' },
    { activity: t('academicPlanActivityReview'), hours: 8, percentage: 13, color: '#d32f2f' },
    { activity: t('academicPlanActivityRest'), hours: 2, percentage: 4, color: '#0288d1' },
  ];

  const semesterPlan: IAcademicItem[] = [
    { activity: t('academicPlanActivityCoreCourses'), hours: 180, percentage: 45, color: '#1976d2' },
    { activity: t('academicPlanActivityElectives'), hours: 90, percentage: 22, color: '#2e7d32' },
    { activity: t('academicPlanActivityLab'), hours: 60, percentage: 15, color: '#9c27b0' },
    { activity: t('academicPlanActivityProjects'), hours: 50, percentage: 12, color: '#ed6c02' },
    { activity: t('academicPlanActivityExamPrep'), hours: 20, percentage: 6, color: '#0288d1' },
  ];

  const yearlyPlan: IAcademicItem[] = [
    { activity: t('academicPlanActivityFallSemester'), hours: 400, percentage: 40, color: '#1976d2' },
    { activity: t('academicPlanActivitySpringSemester'), hours: 400, percentage: 40, color: '#2e7d32' },
    { activity: t('academicPlanActivitySummerLearning'), hours: 100, percentage: 10, color: '#ed6c02' },
    { activity: t('academicPlanActivityInternship'), hours: 60, percentage: 6, color: '#9c27b0' },
    { activity: t('academicPlanActivitySkillDev'), hours: 40, percentage: 4, color: '#0288d1' },
  ];

  const totalWeekly = weeklySchedule.reduce((sum, item) => sum + item.hours, 0);
  const totalSemester = semesterPlan.reduce((sum, item) => sum + item.hours, 0);
  const totalYearly = yearlyPlan.reduce((sum, item) => sum + item.hours, 0);

  const renderScheduleTable = (schedule: IAcademicItem[], total: number, unit: string) => (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        {t('academicPlanAlertCustomize')}
      </Alert>
      
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('academicPlanActivityClasses').split(' &')[0]}</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>{unit}</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Percentage</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Distribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item, index) => (
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
                      {item.activity}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="600">
                    {item.hours} hrs
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
                  {t('academicPlanTotal')}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  {total} hrs
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
          {t('academicPlanningTitle')}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('academicPlanningDescription')}
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={t('academicPlanWeeklySchedule')} />
            <Tab label={t('academicPlanSemesterPlan')} />
            <Tab label={t('academicPlanYearlyPlan')} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          {renderScheduleTable(weeklySchedule, totalWeekly, t('academicPlanUnitHoursWeek'))}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          {renderScheduleTable(semesterPlan, totalSemester, t('academicPlanUnitTotalHours'))}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          {renderScheduleTable(yearlyPlan, totalYearly, t('academicPlanUnitTotalHours'))}
        </TabPanel>
      </CardContent>
    </Card>
  );
};
