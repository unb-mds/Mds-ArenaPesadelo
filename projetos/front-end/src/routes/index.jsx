import { Routes as RoutesDOM, Route, Outlet } from 'react-router-dom';
import { PublicRoute } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { Dashboard } from '../pages/private/Dashboard';
import { Login } from '../pages/public/Login';
import { User } from '../pages/public/User';
import { Inicial } from '../pages/public/Inicial';
import { Leagues } from '../pages/private/Leagues';
import { CreateLeague } from '../pages/private/CreateLeague';

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
        <Route path="/user" element={<User />} />
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
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/create-league" element={<CreateLeague />} />
      </Route>
    </RoutesDOM>
  )
};
