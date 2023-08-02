import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    wallet: Joi.string().required(),
    amount: Joi.number().required(),
    fundedBy: Joi.string().required(),
  }),
};
