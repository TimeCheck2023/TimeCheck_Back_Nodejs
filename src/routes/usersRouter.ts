import { Router } from "express";
// importams el controlador
import { UsersController } from "../controller/userControllers";
//middleware que hace la validacion de los datos que entran
import validateDataMiddle from "../middlewares/validateDataMiddleware";
import authMiddleware from "../middlewares/AuthMiddleware";
// shema que tendra el objeto de la validacion de datos de entrada
import { userSchemaR } from "../utils/userSchema";

const controller = new UsersController();

const router = Router();

router.post("/register", validateDataMiddle(userSchemaR), controller.registerUser);
router.get("/User", authMiddleware, controller.getUser);

export default router;