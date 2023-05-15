import { Request, Response } from "express";
import EventsService from "../services/EventsServices";
const services = new EventsService();


class EventsController {
    async getEvents(req: Request, res: Response) {
        await services.getEvents()
            .then((responde) => {
                res.status(200).json({ message: responde });
            }).catch((error) => {
                res.status(400).json({ error: error });
            })
    }
}


export default EventsController;