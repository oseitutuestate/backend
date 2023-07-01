import Joi from "@hapi/joi";

export default {
  // credentials: Joi.object().keys({}),
  signupAuth: Joi.object().keys({
    fullname: Joi.string().required().min(3),
    email: Joi.string().required().min(4),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean().optional(),
    isSuperAdmin: Joi.boolean().optional(),
  }),
  signinAuth: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
