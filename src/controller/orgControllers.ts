import { Request, Response } from "express";
import { Org_dto } from "../Dto/Org_dto";
import Org_service from '../services/OrgServices'

const services = new Org_service();

class OrgController {
    registerOrg(req: Request, res: Response) {
        const data: Org_dto = req.body;
        services.createOrganization(data)
            .then((responde) => {
                res.status(200).json({ message: responde });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }
}

export default OrgController;