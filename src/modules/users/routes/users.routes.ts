import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UsersController from "../controllers/UsersController";


const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', celebrate({
    [Segments.BODY] : {
        name : Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersController.create);

export default usersRouter; //importar no index.ts