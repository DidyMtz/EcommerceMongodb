const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    adresse: Joi.string().min(6).required(),
    tel: Joi.string().min(6).required(),
    etat: Joi.string().min(2).required(),
    ville: Joi.string().min(6).required(),
    
    reference: Joi.string().min(2),
    codepostal: Joi.string().min(3).required(),
    role: Joi.string()
  });

  return schema.validate(data);
};
// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
// Update validation
const updateValidation = (data) => {
  const schema = Joi.object({
    _id:Joi.string(),
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    adresse: Joi.string().min(6).required(),
    tel: Joi.string().min(6).required(),
    etat: Joi.string().min(2).required(),
    ville: Joi.string().min(6).required(),    
    reference: Joi.string().min(2),
    codepostal: Joi.string().min(3).required(),
    role: Joi.string(),
    datecreation: Joi.date().min(1).required(),
    __v:Joi.number()
  });

  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
