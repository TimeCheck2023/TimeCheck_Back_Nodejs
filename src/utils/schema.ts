import Joi from "joi";

// creamos los shemas de validacion ayudandonos del module Joi que nos facilita la sintaxis

const userSchemaR = Joi.object({
    documentType: Joi.string().required(),
    documentNumber: Joi.string().required(),
    fullName: Joi.string().required(),
    address: Joi.string(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});

const OrgSchemaR = Joi.object({
    organization_name: Joi.string().required(),
    address_organization: Joi.string().required(),
    email_organization: Joi.string().email().required(),
    organization_password: Joi.string()
});


const userSchemaL = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});

export { userSchemaR, OrgSchemaR ,userSchemaL };