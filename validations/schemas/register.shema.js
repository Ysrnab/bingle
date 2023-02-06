const Joi = require('joi')

const registerSchema = Joi.object({
    email: Joi.string().email().required().min(5),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(3).required()
}).required()


module.exports = { registerSchema }