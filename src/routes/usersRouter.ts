import { Router } from "express";
import { UsersController } from "../controller/userControllers";
import validateUserMiddle from "../middlewares/validateUserMiddleware";

const controller = new UsersController;
const router = Router();

router.get('/prueba', (req, res) => {
    res.send('Hola desde el despiegue segunda prueba')
});
router.post("/register", validateUserMiddle, controller.registerUser);
router.post("/login");

export default router;