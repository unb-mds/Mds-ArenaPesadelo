import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";
import teamsRoutes from "../../../modules/teams/infra/routes/teams.routes";
import modalities from "../../../constants/modalities";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/teams', teamsRoutes);
routes.get('/constants/modalities', (_, res) => res.json(modalities));

routes.get('/', (_, res) => res.send('Hello, world!'));

export default routes;
