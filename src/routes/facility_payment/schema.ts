import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    apartmentId: Joi.string().required(),
    paymentAmount: Joi.number().required(),
    paymentMonths: Joi.array().required(),
    paymentYear: Joi.string().required(),
    paidBy: Joi.string().required(),
    recordedBy: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().optional(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
