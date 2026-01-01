import { 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

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
      id={`guide-tabpanel-${index}`}
      aria-labelledby={`guide-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface IGuideItem {
  title: string;
  description: string;
  tips: string[];
}

export const CCareerGuides = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const interviewGuides: IGuideItem[] = [
    {
      title: t('careerGuideInterviewPrep'),
      description: t('careerGuideInterviewPrepDesc'),
      tips: [
        t('careerGuideInterviewPrepTip1'),
        t('careerGuideInterviewPrepTip2'),
        t('careerGuideInterviewPrepTip3'),
      ]
    },
    {
      title: t('careerGuideStarMethod'),
      description: t('careerGuideStarMethodDesc'),
      tips: [
        t('careerGuideStarMethodTip1'),
        t('careerGuideStarMethodTip2'),
        t('careerGuideStarMethodTip3'),
      ]
    },
    {
      title: t('careerGuideDuringInterview'),
      description: t('careerGuideDuringInterviewDesc'),
      tips: [
        t('careerGuideDuringInterviewTip1'),
        t('careerGuideDuringInterviewTip2'),
        t('careerGuideDuringInterviewTip3'),
      ]
    },
    {
      title: t('careerGuideFollowUp'),
      description: t('careerGuideFollowUpDesc'),
      tips: [
        t('careerGuideFollowUpTip1'),
        t('careerGuideFollowUpTip2'),
      ]
    },
  ];

  const resumeGuides: IGuideItem[] = [
    {
      title: t('careerGuideResumeStructure'),
      description: t('careerGuideResumeStructureDesc'),
      tips: [
        t('careerGuideResumeStructureTip1'),
        t('careerGuideResumeStructureTip2'),
        t('careerGuideResumeStructureTip3'),
      ]
    },
    {
      title: t('careerGuideResumeContent'),
      description: t('careerGuideResumeContentDesc'),
      tips: [
        t('careerGuideResumeContentTip1'),
        t('careerGuideResumeContentTip2'),
        t('careerGuideResumeContentTip3'),
      ]
    },
    {
      title: t('careerGuideResumeTailoring'),
      description: t('careerGuideResumeTailoringDesc'),
      tips: [
        t('careerGuideResumeTailoringTip1'),
        t('careerGuideResumeTailoringTip2'),
      ]
    },
    {
      title: t('careerGuideResumeCommon'),
      description: t('careerGuideResumeCommonDesc'),
      tips: [
        t('careerGuideResumeCommonTip1'),
        t('careerGuideResumeCommonTip2'),
        t('careerGuideResumeCommonTip3'),
      ]
    },
  ];

  const careerPathGuides: IGuideItem[] = [
    {
      title: t('careerGuideSelfAssessment'),
      description: t('careerGuideSelfAssessmentDesc'),
      tips: [
        t('careerGuideSelfAssessmentTip1'),
        t('careerGuideSelfAssessmentTip2'),
        t('careerGuideSelfAssessmentTip3'),
      ]
    },
    {
      title: t('careerGuideResearch'),
      description: t('careerGuideResearchDesc'),
      tips: [
        t('careerGuideResearchTip1'),
        t('careerGuideResearchTip2'),
        t('careerGuideResearchTip3'),
      ]
    },
    {
      title: t('careerGuideExperience'),
      description: t('careerGuideExperienceDesc'),
      tips: [
        t('careerGuideExperienceTip1'),
        t('careerGuideExperienceTip2'),
        t('careerGuideExperienceTip3'),
      ]
    },
    {
      title: t('careerGuideGoalSetting'),
      description: t('careerGuideGoalSettingDesc'),
      tips: [
        t('careerGuideGoalSettingTip1'),
        t('careerGuideGoalSettingTip2'),
      ]
    },
  ];

  const renderGuideAccordions = (guides: IGuideItem[]) => (
    <>
      <Alert severity="success" icon={<TipsAndUpdatesOutlinedIcon />} sx={{ mb: 2 }}>
        {t('careerGuideExpandAll')}
      </Alert>
      
      {guides.map((guide, index) => (
        <Accordion 
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
          sx={{ mb: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              bgcolor: expanded === `panel${index}` ? 'primary.50' : 'grey.50',
              '&:hover': { bgcolor: 'primary.100' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {guide.title}
              </Typography>
              <Chip 
                label={`${guide.tips.length} ${t('careerGuideTipsLabel')}`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {guide.description}
            </Typography>
            <List dense>
              {guide.tips.map((tip, tipIndex) => (
                <ListItem key={tipIndex} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2">
                        {tip}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LightbulbOutlinedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('careerGuidesTitle')}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('careerGuidesSubtitle')}
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={t('careerGuideTabInterview')} />
            <Tab label={t('careerGuideTabResume')} />
            <Tab label={t('careerGuideTabCareer')} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          {renderGuideAccordions(interviewGuides)}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          {renderGuideAccordions(resumeGuides)}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          {renderGuideAccordions(careerPathGuides)}
        </TabPanel>
      </CardContent>
    </Card>
  );
};
