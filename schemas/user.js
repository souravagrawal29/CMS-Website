const Joi = require('joi');

const addpost = Joi.object({
    body: Joi.object({
        title: Joi.string()
            .max(50)
            .required(),
        content: Joi.string()
            .required()
    }).required()
});


const editpost = Joi.object({
    body: Joi.object({
        title: Joi.string()
            .max(50)
            .required(),
        content: Joi.string()
            .required()
    }).required()
});


module.exports = {
    addpost,
    editpost
};