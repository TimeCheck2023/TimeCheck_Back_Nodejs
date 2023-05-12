import { Request, Response } from "express";
import SubOrg from "../Dto/SubOrg_dto";
import SubOrg_Services from "../services/SubOrgServices";
const services = new SubOrg_Services();

class SubOrgControllers {
  async registerSubOrg(req: Request, res: Response) {
    const numero = parseInt(req.params.numero);
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
}

export default SubOrgControllers;
