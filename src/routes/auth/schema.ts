import Joi from "@hapi/joi";

export default {
  // credentials: Joi.object().keys({}),
  signupAuth: Joi.object().keys({
    fullname: Joi.string().required().min(3),
    email: Joi.string().required().min(4),
    contact: Joi.string().required().min(10),
    password: Joi.string().required().min(6),
    roleCode: Joi.string().optional(),
  }),
  signinAuth: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
