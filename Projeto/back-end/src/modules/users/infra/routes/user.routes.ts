import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post(
  `/`,
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required().max(255),
      email: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
    },
  }),
  usersController.create
);
userRoutes.post(
  `/sessions`,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
    },
  }),
  usersController.createSessions
);

userRoutes.put(
  `/:userId`,
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      fullName: Joi.string().max(255),
      email: Joi.string().max(255),
      oldPassword: Joi.string().max(255),
      password: Joi.string().max(255),
      registration: Joi.string().max(255),
    },
  }),
  usersController.update,
);

export default userRoutes;
