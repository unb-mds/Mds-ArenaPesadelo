import { Router } from "express";
import GamesController from "../controllers/GamesController";
import { celebrate, Joi, Segments } from "celebrate";
import ensureUserAuth from "../../../users/infra/middleware/ensureUserAuth";

const gamesRoutes = Router();
const gamesController = new GamesController();

gamesRoutes.get(
  "/results/:championshipId",
  celebrate({
    [Segments.PARAMS]: { championshipId: Joi.string().required().uuid() },
  }),
  gamesController.getResults
);
gamesRoutes.get(
  "/phases/:championshipId",
  celebrate({
    [Segments.QUERY]: {
      phase: Joi.number().required(),
    },
    [Segments.PARAMS]: { championshipId: Joi.string().required().uuid() },
  }),
  gamesController.listByPhase
);

gamesRoutes.get(
  "/:championshipId",
  celebrate({
    [Segments.PARAMS]: { championshipId: Joi.string().required().uuid() },
  }),
  gamesController.listByChampionshipId
);

gamesRoutes.put(
  "/:id",
  ensureUserAuth,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required().uuid() },
    [Segments.BODY]: {
      homeScore: Joi.number().min(0),
      visitorScore: Joi.number().min(0),
    },
  }),
  gamesController.update,
);

export default gamesRoutes;