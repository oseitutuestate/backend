import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    type: Joi.string().required(),
    recordedBy: Joi.string().required(),
    apartment: Joi.string().optional(),
    paymentMode: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
    amountPaid: Joi.number().optional(),
    paymentMonths: Joi.array().optional(),
    year: Joi.string().optional(),
    paidBy: Joi.string().optional(),
    item: Joi.string().optional(),
    quantity: Joi.number().optional(),
    unitPrice: Joi.number().optional(),
    totalAmount: Joi.number().optional(),
  }),
};
