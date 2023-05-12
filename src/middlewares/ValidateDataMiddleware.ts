import { NextFunction, Request, Response } from "express";
import Joi from "joi";


const validateDataMiddle = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const id = parseInt(req.params.numero)
  id ? data.id = id : data;
  const { error } = schema.validate(data)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    })
  }
  next()
}

export default validateDataMiddle;