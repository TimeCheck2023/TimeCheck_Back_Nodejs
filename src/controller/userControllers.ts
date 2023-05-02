import { Request, Response } from "express";
import userServices from "../services/user.Services";
import { Users_dto } from "../Dto/Users_dto";
const services = new userServices;


export class UsersController {
    registerUser(req: Request, res: Response) {
        try {
            const Users: Users_dto = req.body;
            services.createUser(Users).then((responde) => {
                res.status(200).json({
                  message: "gracias por tus datos"
                })
            }).catch((err) => {
                res.status(404).json({
                  error: err
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}