import { Request, Response } from "express";
import Auth_service from "../services/AuthServicies";
import { Auth_dto, Password_dto } from "../Dto/Auth_dto"
const services = new Auth_service;


class AuthController {
  async loginUser(req: Request, res: Response) {
    const data: Auth_dto = req.body
    await services.authUser(data)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }

  async verificacionUser(req: Request, res: Response) {
    const codigo: number = req.body.codigo;
    await services.verificacionUser(codigo)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }

  async verificacionEmail(req: Request, res: Response) {
    const Email: string = req.body.email;
    await services.verificacionEmails(Email)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }
  async CambioPassword(req: Request, res: Response) {
    const data: Password_dto = req.body;
    await services.CambioPassword(data)
      .then((responde) => {
        res.status(200).json({ message: responde })
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }

}

export default AuthController;