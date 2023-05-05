import Joi from "joi";


const userSchemaR = Joi.object({
    documentType: Joi.string().required(),
    documentNumber: Joi.string().required(),
    fullName: Joi.string().required(),
    address: Joi.string(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});


const userSchemaL = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});

export { userSchemaR, userSchemaL };