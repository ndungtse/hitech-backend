const Joi = require("joi");

const regvalidation = (data)=>{
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
}

const logvalidation = (data)=>{
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
}

module.exports.regvalidation = regvalidation
module.exports.logvalidation = logvalidation