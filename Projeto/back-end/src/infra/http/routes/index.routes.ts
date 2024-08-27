import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";
import teamsRoutes from "../../../modules/teams/infra/routes/teams.routes";
import modalities from "../../../constants/modalities";
import teamMemberRoutes from "../../../modules/teamMembers/infra/routes/teamMember.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/teams', teamsRoutes);
routes.use('/team-members', teamMemberRoutes);
routes.get('/constants/modalities', (_, res) => res.json(modalities));

routes.get('/', (_, res) => res.send('Hello, world!'));

export default routes;
