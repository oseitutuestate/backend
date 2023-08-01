import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    type: Joi.string().required(),
    account: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
  }),
};
