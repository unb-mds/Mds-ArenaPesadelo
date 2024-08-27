import { Router } from "express";
import userRoutes from "../../../modules/users/infra/routes/user.routes";
import teamsRoutes from "../../../modules/teams/infra/routes/teams.routes";
import modalities from "../../../constants/modalities";
<<<<<<< HEAD
import teamMemberRoutes from "../../../modules/teamMembers/infra/routes/teamMember.routes";
=======
>>>>>>> bbb6ef228a90f59ec79ce6ffdca2ad7c677eee42

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/teams', teamsRoutes);
<<<<<<< HEAD
routes.use('/team-members', teamMemberRoutes);
=======
>>>>>>> bbb6ef228a90f59ec79ce6ffdca2ad7c677eee42
routes.get('/constants/modalities', (_, res) => res.json(modalities));

routes.get('/', (_, res) => res.send('Hello, world!'));

export default routes;
