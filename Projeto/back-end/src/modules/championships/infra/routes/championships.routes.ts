import { Router } from "express";
import ChampionshipController from "../controllers/ChampionshipController";
import { celebrate, Joi, Segments } from "celebrate";
import ensureUserAuth from "../../../users/infra/middleware/ensureUserAuth";
import multer from "multer";
import uploadConfig from "../../../../configs/uploadConfig";

const championshipsRoutes = Router();
const championshipsController = new ChampionshipController();

championshipsRoutes.get("/", championshipsController.list);
championshipsRoutes.get("/upcoming", championshipsController.listUpcoming);
championshipsRoutes.get("/ongoing", championshipsController.listOngoing);
championshipsRoutes.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().uuid() } }),
  championshipsController.find
);

championshipsRoutes.post(
  "/",
  ensureUserAuth,
  multer({ storage: uploadConfig.config.upload }).single("image"),
  celebrate({
    [Segments.BODY]: {
      date: Joi.string()
        .required()
        .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
      from: Joi.string()
        .required()
        .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
      name: Joi.string().required(),
      modality: Joi.number().required(),
      location: Joi.string().required(),
      participants: Joi.number().required(),
      to: Joi.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
      description: Joi.string(),
      locationLat: Joi.number(),
      locationLng: Joi.number(),
    },
  }),
  championshipsController.create
);

championshipsRoutes.put(
  "/:championshipId",
  ensureUserAuth,
  multer({ storage: uploadConfig.config.upload }).single("image"),
  celebrate({
    [Segments.BODY]: {
      date: Joi.string()
        .required()
        .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
      from: Joi.string()
        .required()
        .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
      name: Joi.string().required(),
      modality: Joi.number().required(),
      location: Joi.string().required(),
      participants: Joi.number().required(),
      to: Joi.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
      description: Joi.string(),
      locationLat: Joi.number(),
      locationLng: Joi.number(),
    },
  }),
  championshipsController.update
);

championshipsRoutes.delete(
  "/:id",
  ensureUserAuth,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().uuid() } }),
  championshipsController.delete
);

export default championshipsRoutes;
