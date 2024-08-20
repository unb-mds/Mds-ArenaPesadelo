import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";
import teamsRoutes from "../../../modules/teams/infra/routes/teams.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/teams', teamsRoutes);

routes.get('/', (_, res) => res.send('Hello, world!'));

export default routes;
