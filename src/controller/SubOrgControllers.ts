import { Request, Response } from "express";
import { SubOrg } from "../Dto/SubOrg_dto";
import SubOrg_Services from "../services/SubOrgServices";
const services = new SubOrg_Services();

class SubOrgControllers {

  async getSubOrg(req: Request, res: Response) {
    await services.getSubOrg()
      .then((responde) => {
        res.status(200).json({ message: responde });
      })
      .catch((error) => {
        res.status(400).json({ error: error.originalError.info.message });
      });
  }
  async getSubOrgId(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await services.getSubOrgId(id)
      .then((responde) => {
        res.status(200).json({ message: responde });
      })
      .catch((error) => {
        res.status(400).json({ error: error.originalError.info.message });
      });
  }

  async registerSubOrg(req: Request, res: Response) {
    const numero = parseInt(req.params.id);
    const data: SubOrg = req.body;
    await services
      .createSubOrganization(data, numero)
      .then((responde) => {
        res.status(200).json({ message: responde });
      })
      .catch((error) => {
        res.status(400).json({ error: error.originalError.info.message });
      });
  }

  async UpdateSubOrg(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const data = req.body;
    await services.updateSubOrg(data, id)
    .then((responde) => {
      res.status(200).json({ message: responde });
    })
    .catch((error) => {
      res.status(400).json({ error: error.originalError.info.message });
    });
  }
}

export default SubOrgControllers;
