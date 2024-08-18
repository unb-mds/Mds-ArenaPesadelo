import { BrowserRouter, Outlet, Route, Routes as DOMRoutes } from "react-router-dom";
import { Public } from "./Public";
import { Protected } from "./Protected";
import { Home } from "../pages/private/Home";
import { SingUp } from "../pages/public/SignUp";
import { LoginModal } from "../components/LoginModal";
import { Me } from "../pages/private/Me";
import { MyTeams } from "../pages/private/MyTeams";
import { CreateNewTeam } from "../pages/private/CreateNewTeam";

export const Routes = () => {
  return (
    <BrowserRouter>
      <DOMRoutes>
        <Route
          element={
            <Protected>
              <Outlet />
            </Protected>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/me" element={<Me />} />
          <Route path="/my-teams" element={<MyTeams />} />
          <Route path="/new-team" element={<CreateNewTeam />} />
        </Route>

        <Route
          element={
            <Public>
              <Outlet />
              <LoginModal />
            </Public>
          }
        >
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/" element={<SingUp />} />
        </Route>
      </DOMRoutes>
    </BrowserRouter>
  );
}
