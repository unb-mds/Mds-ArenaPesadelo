import { BrowserRouter, Outlet, Route, Routes as DOMRoutes } from "react-router-dom";
import { Public } from "./Public";
import { Protected } from "./Protected";
import { Home } from "../pages/private/Home";
import { SingUp } from "../pages/public/SignUp";
import { LoginModal } from "../components/LoginModal";
import { Me } from "../pages/private/Me";

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
