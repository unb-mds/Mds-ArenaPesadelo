import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import ensureUserAuth from "../middleware/ensureUserAuth";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get('/', ensureUserAuth, usersController.list);

userRoutes.post(
  `/`,
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required().max(255),
      email: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
      registration: Joi.string().required().max(255),
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
  `/`,
  ensureUserAuth,
  celebrate({
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

userRoutes.patch(
  `/accesses/:userId`,
  ensureUserAuth,
  celebrate({
    [Segments.PARAMS]: { userId: Joi.string().required().uuid() },
    [Segments.BODY]: {
      access: Joi.number().required(),
    },
  }),
  usersController.updateUserAccess,
);

export default userRoutes;
