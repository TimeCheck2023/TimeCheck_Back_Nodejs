import { Router } from "express";
import OrgController from "../controller/OrgControllers";
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { OrgSchemaR } from "../utils/schema";
const controller = new OrgController();

const router = Router();

router.post('/register', validateDataMiddle(OrgSchemaR))

export default router;