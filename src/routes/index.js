import { Router } from "express";
import userRouter from "./user.route.js";

const router = Router()

router.use('/api/v1', userRouter)

export default router