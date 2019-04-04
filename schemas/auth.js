const Joi = require('joi');

const register = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .max(50)
            .min(3)
            .required(),
        username: Joi.string()
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .required(),
        password_confirm: Joi.string()
            .min(8)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .max(100)
            .required(),
        organisation: Joi.string()
            .max(100)
            .required()
    }).required()
});

const login = Joi.object({
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    }).required()
});


module.exports = {
    register,
    login
};