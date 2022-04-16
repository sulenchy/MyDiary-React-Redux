import LandingPage from './components/home/LandingPage';
import Dashboard from './components/dashboard/index';
import Entry from './components/entry/index';

const routes = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/index',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/entries',
    component: Entry,
    exact: true,
  },
];

export default routes;
