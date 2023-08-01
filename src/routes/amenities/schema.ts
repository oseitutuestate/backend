import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    apartment: Joi.string().required(),
    clientName: Joi.string().required(),
    amountPaid: Joi.number().required(),
    recordedBy: Joi.string().required(),
  }),
};
