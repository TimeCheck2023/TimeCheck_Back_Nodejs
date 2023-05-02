import Joi from "joi";


const userSchemaR = Joi.object({
    documentType: Joi.string().required(),
    documentNumber: Joi.string().required(),
    fullName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    // "password" debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()
});


const userSchemaL = Joi.object({
    emailAddress: Joi.string().email().required(),
    // "password" debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()
});

export { userSchemaR, userSchemaL };