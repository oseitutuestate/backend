import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    recipient: Joi.array().required(),
    message: Joi.string().required(),
  }),
};
