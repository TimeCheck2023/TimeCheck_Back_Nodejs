import { Request, Response } from "express";
import userServices from "../services/userServices";
import { Users_dto } from "../Dto/Users_dto";
const services = new userServices();


class UsersController {
  async registerUser(req: Request, res: Response) {
    const Users: Users_dto = req.body;
    services.createUser(Users)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(404).json({ error: error.originalError.info.message })
      });
  }

  async getUser(req: Request, res: Response) {
    res.status(200).json({
      message: 'User social profile'
    })
  }
}

export default UsersController;