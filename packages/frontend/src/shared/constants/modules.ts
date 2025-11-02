import { IModule } from '../interfaces/common';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { createElement } from 'react';
export const getModules = (t: (key: string) => string): IModule[] => [
  {
    id: 'academic-planning',
    title: t('academicPlanningTitle'),
    description: t('academicPlanningDescription'),
    icon: createElement(MenuBookOutlinedIcon, { sx: { fontSize: 40 } }),
    path: '/academic-planning',
  },
  {
    id: 'career-guidance',
    title: t('careerGuidanceTitle'),
    description: t('careerGuidanceDescription'),
    icon: createElement(WorkOutlineOutlinedIcon, { sx: { fontSize: 40 } }),
    path: '/career-guidance',
  },
  {
    id: 'university-life',
    title: t('universityLifeTitle'),
    description: t('universityLifeDescription'),
    icon: createElement(SchoolOutlinedIcon, { sx: { fontSize: 40 } }),
    path: '/university-life',
  },
  {
    id: 'study-skills',
    title: t('studySkillsTitle'),
    description: t('studySkillsDescription'),
    icon: createElement(LocalLibraryOutlinedIcon, { sx: { fontSize: 40 } }),
    path: '/study-skills',
  },
  {
    id: 'personal-development',
    title: t('personalDevelopmentTitle'),
    description: t('personalDevelopmentDescription'),
    icon: createElement(TrendingUpOutlinedIcon, { sx: { fontSize: 40 } }),
    path: '/personal-development',
  },
  {
    id: 'financial-planning',
    title: t('financialPlanningTitle'),
    description: t('financialPlanningDescription'),
    icon: createElement(AccountBalanceWalletOutlinedIcon, {
      sx: { fontSize: 40 },
    }),
    path: '/financial-planning',
  },
];
