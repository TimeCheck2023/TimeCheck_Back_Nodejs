import { Router } from "express";
import EventsController from "../controller/EventsControllers";
const controller = new EventsController();
const router = Router();


router.get('/List', controller.getEvents)


export default router;