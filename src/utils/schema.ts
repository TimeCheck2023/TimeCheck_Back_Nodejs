import Joi from "joi";

// creamos los shemas de validacion ayudandonos del module Joi que nos facilita la sintaxis

export const userSchemaR = Joi.object({
    documentType: Joi.string().required(),
    documentNumber: Joi.number().required(),
    fullName: Joi.string().required(),
    address: Joi.string(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});

export const userSchemaUpdate = Joi.object({
    id: Joi.number().required(),
    documentType: Joi.string().allow(null, ''),
    fullName: Joi.string().allow(null, ''),
    address: Joi.string().allow(null, ''),
    typeofpopulation: Joi.string().allow(null, ''),
    emailAddress: Joi.string().email().required()
});

export const OrgSchemaR = Joi.object({
    id: Joi.number(),
    organization_name: Joi.string().required(),
    address_organization: Joi.string().required(),
    email_organization: Joi.string().email().required(),
    organization_password: Joi.string(),
    numero_telefono: Joi.number().required(),
});

export const SubOrgSchemaR = Joi.object({
    name_organization: Joi.string().required(),
    description_organization: Joi.string().required(),
    id: Joi.number().required()
});


export const userSchemaL = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
});
