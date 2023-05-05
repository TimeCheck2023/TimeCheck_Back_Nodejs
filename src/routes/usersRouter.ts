import { Router } from "express";
// importams el controlador
import { UsersController } from "../controller/userControllers";
//middleware que hace la validacion de los datos que entran
import validateUserMiddle from "../middlewares/validateUserMiddleware";
// shema que tendra el objeto de la validacion de datos de entrada
import { userSchemaL, userSchemaR } from "../utils/userSchema";

const controller = new UsersController;

const router = Router();

router.post("/register", validateUserMiddle(userSchemaR), controller.registerUser);
router.post("/login", validateUserMiddle(userSchemaL), controller.loginUser);

export default router;