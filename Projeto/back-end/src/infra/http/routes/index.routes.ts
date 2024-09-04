import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";
import teamsRoutes from "../../../modules/teams/infra/routes/teams.routes";
import modalities from "../../../constants/modalities";
import teamMemberRoutes from "../../../modules/teamMembers/infra/routes/teamMember.routes";
import championshipsRoutes from "../../../modules/championships/infra/routes/championships.routes";
import championshipRegistrationsRoutes from "../../../modules/championshipRegistrations/infra/routes/championshipRegistrations.routes";
import gamesRoutes from "../../../modules/games/infra/routes/games.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/teams', teamsRoutes);
routes.use('/team-members', teamMemberRoutes);
routes.use('/championships', championshipsRoutes);
routes.use('/championship-registrations', championshipRegistrationsRoutes);
routes.use('/games', gamesRoutes);
routes.get('/constants/modalities', (_, res) => res.json(modalities));

routes.get('/', (_, res) => res.send('Hello, world!'));

export default routes;
