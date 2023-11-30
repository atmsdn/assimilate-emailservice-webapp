import AuthGuard from '../app/auth/AuthGuard';
import dashboardRoutes from '../app/views/dashboard/DashboardRoutes';
import sessionRoutes from '../app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes,],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="/dashboard" /> }
];

export default routes;
