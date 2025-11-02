import { RouteObject } from 'react-router-dom';
import { CAboutPage } from '../pages/CAboutPage';

export const aboutRoutes: RouteObject[] = [
  {
    path: '/about',
    element: <CAboutPage />,
  },
];