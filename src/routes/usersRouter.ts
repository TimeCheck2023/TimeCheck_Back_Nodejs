import { Router } from "express";
import { UsersController } from "../controller/userControllers";
import validateUserMiddle from "../middlewares/validateUserMiddleware";

const controller = new UsersController;
const router = Router();

router.post("/Register", validateUserMiddle, controller.registerUser);
router.post("/Login");

export default router;