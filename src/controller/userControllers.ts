import { Request, Response } from "express";
import userServices from "../services/user.Services";
import { Users_dto } from "../Dto/Users_dto";
const services = new userServices;


export class UsersController {
    registerUser(req: Request, res: Response) {
        try {
            const Users: Users_dto = req.body;
            console.log(Users)
            services.createUser(Users).then((responde) => {
                console.log(responde);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);

        }
    }
}