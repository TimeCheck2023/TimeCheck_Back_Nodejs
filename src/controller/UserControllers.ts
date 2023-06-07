import { Request, Response } from "express";
import userServices from "../services/UserServices";
import { NotPasswordIdentify, Users_dto } from "../Dto/Users_dto";
const services = new userServices();


class UsersController {

  async getUsers(req: Request, res: Response) {
    services.getUsers()
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }

  async getUserId(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)
    services.getUserId(id)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }


  async getUserSubMiembroId(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)
    services.getUserSubMiembroId(id)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }

  async registerUser(req: Request, res: Response) {
    const Users: Users_dto = req.body;
    services.createUser(Users)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }

  async updateUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const data: NotPasswordIdentify = req.body;
    services.UpdateUsers(data, id)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }

  async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await services.deleteUserId(id)
      .then((responde) => {
        res.status(200).json({ message: responde })        
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }
}

export default UsersController;
