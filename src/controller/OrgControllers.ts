import { Request, Response } from "express";
import Org_service from '../services/OrgServices'
import { Org_dto } from "../Dto/Org_dto";
const services = new Org_service();

class OrgController {

    async getOrg(req: Request, res: Response) {
        await services.getOrg()
            .then((response) => {
                res.status(200).json({ message: response });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }
    async getOrgId(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await services.getOrgId(id)
            .then((response) => {
                res.status(200).json({ message: response });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }

    registerOrg(req: Request, res: Response) {
        const data: Org_dto = req.body;
        services.createOrganization(data)
            .then((responde) => {
                res.status(200).json({ message: responde });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }

    updateOrgId(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        services.updateOrganization(data, id)
            .then((responde) => {
                res.status(200).json({ message: responde });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }

    deleteOrgId(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        services.deleteOrganizationId(id)
            .then((responde) => {
                res.status(200).json({ message: responde });
            }).catch((error) => {
                res.status(400).json({ error: error.originalError.info.message });
            })
    }

}

export default OrgController;
