import { Router } from "express";
import TeamMembersController from "../controllers/TeamMembersController";
import { celebrate, Joi, Segments } from "celebrate";
import ensureUserAuth from "../../../users/infra/middleware/ensureUserAuth";

const teamMemberRoutes = Router();
const teamMembersController = new TeamMembersController();

teamMemberRoutes.get(
  "/teams/:teamId",
  ensureUserAuth,
  celebrate({ [Segments.PARAMS]: { teamId: Joi.string().required().uuid() } }),
  teamMembersController.listByTeamId
);
teamMemberRoutes.get(
  "/:id",
  ensureUserAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().uuid() } }),
  teamMembersController.findById
);

teamMemberRoutes.post(
  "/",
  ensureUserAuth,
  celebrate({
    [Segments.BODY]: {
      registration: Joi.string().required(),
      name: Joi.string().required(),
      teamId: Joi.string().required().uuid(),
    },
  }),
  teamMembersController.create
);

teamMemberRoutes.put(
  "/:id",
  ensureUserAuth,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required().uuid() },
    [Segments.BODY]: {
      registration: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  teamMembersController.update
);

teamMemberRoutes.delete(
  "/:id",
  ensureUserAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().uuid() } }),
  teamMembersController.delete
);

export default teamMemberRoutes;
