const Joi = require('joi')

/**
 * Nombre, apellido, email, telefono, password
 */

const schema = Joi.object({
    nombre: Joi.string()
               .alphanum()
               .min(5)
               .max(20)
               .required(),
    
    apellido: Joi.string()
                .alphanum()
                .min(3)
                .max(20)
                .required(),

    password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    telefono: Joi.number(),

    caracteristica: Joi.number()
}).options({ abortEarly: false })

module.exports = schema