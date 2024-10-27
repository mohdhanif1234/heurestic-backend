import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const { register, login } = UserController

const userRouter = Router()

userRouter.post('/user/register', register)
userRouter.get('/user/login', login)

export default userRouter