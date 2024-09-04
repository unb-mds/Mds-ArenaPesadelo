import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ensureUserAuth from "../../../users/infra/middleware/ensureUserAuth";
import ChampionshipRegistrationsController from "../controllers/ChampionshipRegistrationsController";

const championshipRegistrationsRoutes = Router();
const championshipRegistrationsController = new ChampionshipRegistrationsController();

championshipRegistrationsRoutes.post(
  "/",
  ensureUserAuth,
  celebrate({
    [Segments.BODY]: {
      teamId: Joi.string().required().uuid(),
      championshipId: Joi.string().required().uuid(),
    },
  }),
  championshipRegistrationsController.create,
);

export default championshipRegistrationsRoutes;