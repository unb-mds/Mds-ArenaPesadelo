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

export default userRoutes;
