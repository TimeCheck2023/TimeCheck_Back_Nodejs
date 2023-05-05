import { Request, Response } from "express";
import userServices from "../services/user.Services";
import { Users_dto } from "../Dto/Users_dto";
const services = new userServices;


export class UsersController {
  async registerUser(req: Request, res: Response) {
    try {
      const Users: Users_dto = req.body;
      let response = await services.createUser(Users)
      res.status(200).json({ message: response })
    } catch (error) {
      res.status(404).json({ error: error})
    }
    // services.createUser(Users).then((responde) => {
    //   res.status(200).json({ message: responde })
    // }).catch((error) => {
    //   res.status(404).json({ error: error.originalError.info.message })
    // })
  }
}