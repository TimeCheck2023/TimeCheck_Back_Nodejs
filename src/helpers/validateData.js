const Joi = require('joi')

const verfiRegister = Joi.object({
    cedula: Joi.string().pattern(/^[0-9]{10}$/).required(),
    documentType: Joi.string().required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    lastNameOne: Joi.string().alphanum().min(3).max(30),
    lastNameTwo: Joi.string().alphanum().min(3).max(30),
    address: Joi.string().min(3).max(50).required(),
    //para definir los valores permitidos ("urbana" o "rural").
    typeofpopulation: Joi.string().valid("urbana", "rural"),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneOne: Joi.string().pattern(/^\d{10}$/),
    phoneTwo: Joi.string().pattern(/^\d{10}$/),
})

module.exports = verfiRegister