import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    wallet: Joi.string().required(),
    amount: Joi.string().required(),
    fundedBy: Joi.string().required(),
  }),
};
