import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ensureUserAuth from "../../../users/infra/middleware/ensureUserAuth";
import TeamsController from "../controllers/TeamsController";

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get(
  "/:id",
  ensureUserAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().uuid() } }),
  teamsController.find
);

teamsRoutes.get(
  "/leaders/list",
  ensureUserAuth,
  teamsController.listByLeaderId
);
teamsRoutes.get(
  "/leaders/list/filter",
  ensureUserAuth,
  celebrate({[Segments.QUERY]: { modality: Joi.number().required() }}),
  teamsController.filterLeaderTeams
);

teamsRoutes.post(
  "/",
  ensureUserAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      modality: Joi.number().required(),
    },
  }),
  teamsController.create,
);

teamsRoutes.put(
  '/:id',
  ensureUserAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      modality: Joi.number(),
    },
  }),
  teamsController.update,
);

export default teamsRoutes;
