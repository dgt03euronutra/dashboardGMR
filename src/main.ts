import './dashboard.scss';
import { initDashboard } from './dashboard';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) initDashboard(app);
