import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    employee: Joi.string().required(),
    description: Joi.string().required(),
    results: Joi.string().optional(),
    action: Joi.string().optional(),
    completionDate: Joi.string().optional(),
  }),
  update: Joi.object().keys({
    description: Joi.string().optional(),
    results: Joi.string().optional(),
    action: Joi.string().optional(),
    completionDate: Joi.string().optional(),
  }),
};
