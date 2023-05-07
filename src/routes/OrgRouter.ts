import { Router } from "express";
import OrgController from "../controller/orgControllers";
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { OrgSchemaR } from "../utils/schema";
const controller = new OrgController();

const router = Router();

router.post('/register', validateDataMiddle(OrgSchemaR), controller.registerOrg)


export default router;