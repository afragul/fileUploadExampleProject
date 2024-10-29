const Joi = require("joi");

const registerSchema = Joi.object().keys({
  Name: Joi.string().min(3).required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).max(15).required()
});

const updateSchema = Joi.object().keys({
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).max(15).required()
});

const loginSchema = Joi.object().keys({
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).max(15).required(),
});

module.exports = { registerSchema, updateSchema, loginSchema };
