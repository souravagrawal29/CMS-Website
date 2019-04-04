const Joi = require('joi');

module.exports = (schema) => (req,res,next) =>{
    let data = {};
    if(Object.keys(req.body).length)
        data.body = req.body;
    Joi.validate(data,schema, {abortEarly: false}, (err,value)=>{
        if(err){
            console.log(err);
            return res.status(400).send(err.details);
        }
        next();
    });
}