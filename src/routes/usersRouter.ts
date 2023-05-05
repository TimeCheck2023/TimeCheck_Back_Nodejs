import { Router } from "express";
import { UsersController } from "../controller/userControllers";
import validateUserMiddle from "../middlewares/validateUserMiddleware";
import { userSchemaL, userSchemaR } from "../utils/userSchema";

const controller = new UsersController;
const router = Router();

router.post("/register", validateUserMiddle(userSchemaR), controller.registerUser);
router.post("/login");

export default router;