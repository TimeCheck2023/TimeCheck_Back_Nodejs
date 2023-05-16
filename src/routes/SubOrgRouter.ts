import { Router } from "express";
import SubOrgControllers from '../controller/SubOrgControllers';
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { SubOrgSchemaR } from "../utils/schema";
const controller = new SubOrgControllers()

const router = Router();

router.post('/register/:id', validateDataMiddle(SubOrgSchemaR), controller.registerSubOrg)

export default router;