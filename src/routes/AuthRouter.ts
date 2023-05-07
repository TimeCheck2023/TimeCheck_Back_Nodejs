import { Router } from "express";
import validateDataMiddle from "../middlewares/validateDataMiddleware";
import { userSchemaL } from "../utils/userSchema";
import AuthController from '../controller/AuthControllers'
const controller = new AuthController()

const router = Router();

router.post('/login', validateDataMiddle(userSchemaL), controller.loginUser);

export default router;