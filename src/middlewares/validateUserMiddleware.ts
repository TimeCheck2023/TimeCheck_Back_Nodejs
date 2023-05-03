import { NextFunction, Request, Response } from "express";
import { userSchemaR, userSchemaL } from "../utils/userSchema";


const validateUserMiddle = (req: Request, res: Response, next: NextFunction) => {
    console.log(`La solicitud fue hecha a la ruta ${req.path}`)
    const data = req.body;
    const { error } = req.path === '/register' ? userSchemaR.validate(data) : userSchemaL.validate(data)
    // const { error } = await userSchemaR.validateAsync(data)
    if (error) {
      console.log(error.details[0].message);
        return res.status(400).json({
            error: error.details[0].message,
        })
    }    
    next()
}

export default validateUserMiddle;