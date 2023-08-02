import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    name: Joi.string().required(),
    cost: Joi.number().required(),
    description: Joi.string().required(),
    recordedBy: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().optional(),
    cost: Joi.number().optional(),
    description: Joi.string().optional(),
  }),
};
