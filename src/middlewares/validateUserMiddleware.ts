import { NextFunction, Request, Response } from "express";
import Joi from "joi";


const validateUserMiddle = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { error } = schema.validate(data)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    })
  }
  next()
}

export default validateUserMiddle;