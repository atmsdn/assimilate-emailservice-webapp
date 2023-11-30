import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const AddOrganizationDetails = Loadable(lazy(() => import('./AddOrganizationDetails')));
const OrganizationDetailsList = Loadable(lazy(() => import('./OrganizationDetailsList')));

const dashboardRoutes = [
  { path: '/dashboard', element: <OrganizationDetailsList /> },
  { path: '/add-organization-details/:id', element: <AddOrganizationDetails /> },
  { path: '/add-organization-details', element: <AddOrganizationDetails /> }
];

export default dashboardRoutes;
