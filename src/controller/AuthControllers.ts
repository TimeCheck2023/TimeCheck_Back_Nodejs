import { Request, Response } from "express";
import Auth_service from "../services/AuthServicies";
import { Users_dto } from "../Dto/Users_dto";
const services = new Auth_service;


class AuthController {
  async loginUser(req: Request, res: Response) {
    const data: Users_dto = req.body
    await services.authUser(data)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }

}

export default AuthController;