import { Routes as RoutesDOM, Route, Outlet } from 'react-router-dom';
import { PublicRoute } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { Dashboard } from '../pages/private/Dashboard';
import { Login } from '../pages/public/Login';
import { User} from '../pages/public/User';
import { Inicial } from '../pages/public/Inicial';

export const Routes = () => {
  return (
    <RoutesDOM>
<Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path="/" element={<Inicial />} />
        <Route path="/inicial" element={<Inicial />} />
      </Route>  

      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path="/" element={<User />} />
        <Route path="/user" element={<User />} />
      </Route>  

      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </RoutesDOM>
  )
};
