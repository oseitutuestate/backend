import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    item: Joi.string().required(),
    quantity: Joi.number().required(),
    unitPrice: Joi.number().required(),
    totalAmount: Joi.number().required(),
    walletId: Joi.string().required(),
    user: Joi.string().required(),
  }),
  //   update: Joi.object().keys({
  //     name: Joi.string().optional(),
  //   }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
