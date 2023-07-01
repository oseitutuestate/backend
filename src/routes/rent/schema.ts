import Joi from "@hapi/joi";

export default {
  payloadRent: Joi.object().keys({
    apartment: Joi.string().required(),
    monthsRented: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    totalAmount: Joi.number().required(),
    clientName: Joi.string().required(),
    clientNumber: Joi.string().required(),
    clientEmail: Joi.string().required(),
  }),
  updateRent: Joi.object().keys({
    apartment: Joi.string().optional(),
    monthsRented: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    totalAmount: Joi.number().optional(),
    clientName: Joi.string().optional(),
    clientNumber: Joi.string().optional(),
    clientEmail: Joi.string().optional(),
  }),
  payloadRental: Joi.object().keys({
    apartment: Joi.string().required(),
    image: Joi.string().optional(),
    pricePerMonth: Joi.string().required(),
  }),
  updateRental: Joi.object().keys({
    apartment: Joi.string().optional(),
    image: Joi.string().optional(),
    pricePerMonth: Joi.string().optional(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
  payloadRentComm: Joi.object().keys({
    type: Joi.string().required(),
    description: Joi.string().required(),
    percentage: Joi.string().required(),
  }),
  updateRentComm: Joi.object().keys({
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    percentage: Joi.string().optional(),
  }),
};
