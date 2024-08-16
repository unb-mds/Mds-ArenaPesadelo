import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";

const routes = Router();

routes.use('/users', userRoutes);

export default routes;
