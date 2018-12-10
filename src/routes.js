import LandingPage from './components/home/LandingPage';
import index from './components/index';

const routes = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/index',
    component: index,
    exact: true,
  },
];

export default routes;
