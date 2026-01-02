import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

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
      id={`challenge-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface IDevelopmentPath {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: string[];
}

interface IChallenge {
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  tasks: string[];
}

export const CPathsAndChallenges = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPath(event.target.value);
  };

  const toggleChallenge = (index: number) => {
    const newCompleted = new Set(completedChallenges);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedChallenges(newCompleted);
  };

  const developmentPaths: IDevelopmentPath[] = [
    {
      title: t('pathLeadership'),
      description: t('pathLeadershipDesc'),
      duration: t('path12Weeks'),
      difficulty: 'intermediate',
      focus: [t('pathFocusLeadership1'), t('pathFocusLeadership2'), t('pathFocusLeadership3')]
    },
    {
      title: t('pathCommunication'),
      description: t('pathCommunicationDesc'),
      duration: t('path8Weeks'),
      difficulty: 'beginner',
      focus: [t('pathFocusCommunication1'), t('pathFocusCommunication2'), t('pathFocusCommunication3')]
    },
    {
      title: t('pathEmotionalIntelligence'),
      description: t('pathEmotionalIntelligenceDesc'),
      duration: t('path10Weeks'),
      difficulty: 'advanced',
      focus: [t('pathFocusEI1'), t('pathFocusEI2'), t('pathFocusEI3')]
    },
  ];

  const challenges: IChallenge[] = [
    {
      title: t('challenge30DayReading'),
      description: t('challenge30DayReadingDesc'),
      points: 100,
      difficulty: 'easy',
      duration: t('challenge30Days'),
      tasks: [
        t('challenge30DayReadingTask1'),
        t('challenge30DayReadingTask2'),
        t('challenge30DayReadingTask3'),
      ]
    },
    {
      title: t('challengePublicSpeaking'),
      description: t('challengePublicSpeakingDesc'),
      points: 250,
      difficulty: 'hard',
      duration: t('challenge2Months'),
      tasks: [
        t('challengePublicSpeakingTask1'),
        t('challengePublicSpeakingTask2'),
        t('challengePublicSpeakingTask3'),
      ]
    },
    {
      title: t('challengeNetworking'),
      description: t('challengeNetworkingDesc'),
      points: 150,
      difficulty: 'medium',
      duration: t('challenge6Weeks'),
      tasks: [
        t('challengeNetworkingTask1'),
        t('challengeNetworkingTask2'),
        t('challengeNetworkingTask3'),
      ]
    },
    {
      title: t('challengeDailyJournal'),
      description: t('challengeDailyJournalDesc'),
      points: 200,
      difficulty: 'medium',
      duration: t('challenge60Days'),
      tasks: [
        t('challengeDailyJournalTask1'),
        t('challengeDailyJournalTask2'),
        t('challengeDailyJournalTask3'),
      ]
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
      case 'easy': return 'success';
      case 'intermediate':
      case 'medium': return 'warning';
      case 'advanced':
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    if (difficulty === 'beginner' || difficulty === 'easy') return t('difficultyEasy');
    if (difficulty === 'intermediate' || difficulty === 'medium') return t('difficultyIntermediate');
    if (difficulty === 'advanced' || difficulty === 'hard') return t('difficultyAdvanced');
    return difficulty;
  };

  const totalPoints = challenges.reduce((sum, challenge, index) => 
    completedChallenges.has(index) ? sum + challenge.points : sum, 0
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {t('pathsChallengesTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('pathsChallengesSubtitle')}
          </Typography>
        </Box>
        {tabValue === 1 && (
          <Chip 
            icon={<EmojiEventsOutlinedIcon />}
            label={`${totalPoints} ${t('challengePoints')}`}
            color="warning"
            sx={{ fontWeight: 'bold' }}
          />
        )}
      </Box>

      <Card elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab 
              label={t('tabDevelopmentPaths')} 
              icon={<LocalFireDepartmentOutlinedIcon />}
              iconPosition="start"
            />
            <Tab 
              label={t('tabChallenges')} 
              icon={<FlashOnOutlinedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <CardContent>
          <TabPanel value={tabValue} index={0}>
            <Alert severity="info" sx={{ mb: 3 }}>
              {t('pathsSelectInfo')}
            </Alert>

            <RadioGroup value={selectedPath} onChange={handlePathChange}>
              <Stack spacing={2}>
                {developmentPaths.map((path, index) => (
                  <Card 
                    key={index}
                    variant="outlined"
                    sx={{
                      borderWidth: selectedPath === path.title ? 2 : 1,
                      borderColor: selectedPath === path.title ? 'primary.main' : 'divider',
                      bgcolor: selectedPath === path.title ? 'primary.50' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel
                        value={path.title}
                        control={<Radio />}
                        label={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {path.title}
                              </Typography>
                              <Chip 
                                label={getDifficultyLabel(path.difficulty)}
                                size="small"
                                color={getDifficultyColor(path.difficulty) as any}
                              />
                              <Chip label={path.duration} size="small" variant="outlined" />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {path.description}
                            </Typography>
                            <Typography variant="caption" fontWeight="600" color="text.secondary">
                              {t('pathFocusAreas')}:
                            </Typography>
                            <List dense>
                              {path.focus.map((item, fIndex) => (
                                <ListItem key={fIndex} sx={{ py: 0.25, pl: 0 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <CheckCircleOutlineIcon fontSize="small" color="primary" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={<Typography variant="body2">{item}</Typography>}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </RadioGroup>

            {selectedPath && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="contained" size="large" startIcon={<LocalFireDepartmentOutlinedIcon />}>
                  {t('pathStartJourney')}
                </Button>
              </Box>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('challengesInfo')}
            </Alert>

            <Stack spacing={2}>
              {challenges.map((challenge, index) => {
                const isCompleted = completedChallenges.has(index);
                
                return (
                  <Card 
                    key={index}
                    variant="outlined"
                    sx={{
                      borderLeft: 4,
                      borderColor: isCompleted ? 'success.main' : 'grey.300',
                      bgcolor: isCompleted ? 'success.50' : 'transparent',
                      opacity: isCompleted ? 0.8 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {challenge.title}
                            </Typography>
                            <Chip 
                              label={getDifficultyLabel(challenge.difficulty)}
                              size="small"
                              color={getDifficultyColor(challenge.difficulty) as any}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {challenge.description}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip 
                              label={`${challenge.points} ${t('challengePoints')}`}
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                            <Chip label={challenge.duration} size="small" variant="outlined" />
                          </Stack>
                        </Box>
                        <Button
                          variant={isCompleted ? "outlined" : "contained"}
                          color={isCompleted ? "success" : "primary"}
                          startIcon={isCompleted ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedOutlinedIcon />}
                          onClick={() => toggleChallenge(index)}
                          sx={{ minWidth: 140 }}
                        >
                          {isCompleted ? t('challengeCompleted') : t('challengeAccept')}
                        </Button>
                      </Box>

                      <Typography variant="caption" fontWeight="600" color="text.secondary">
                        {t('challengeTasks')}:
                      </Typography>
                      <List dense>
                        {challenge.tasks.map((task, tIndex) => (
                          <ListItem key={tIndex} sx={{ py: 0.25, pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <CheckCircleOutlineIcon fontSize="small" color={isCompleted ? "success" : "action"} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={<Typography variant="body2">{task}</Typography>}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};
