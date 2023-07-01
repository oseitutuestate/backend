import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    name: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().optional(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
