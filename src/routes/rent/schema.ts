import Joi from "@hapi/joi";

export default {
  payloadRent: Joi.object().keys({
    apt: Joi.string().required(),
    type: Joi.string().required(),
    monthsRented: Joi.string().optional(),
    daysRented: Joi.string().optional(),
    checkin: Joi.date().required(),
    checkout: Joi.date().required(),
    totalAmount: Joi.number().required(),
    clientName: Joi.string().required(),
    clientNumber: Joi.string().required(),
    clientEmail: Joi.string().required(),
  }),
  updateRent: Joi.object().keys({
    apt: Joi.string().optional(),
    type: Joi.string().optional(),
    monthsRented: Joi.string().optional(),
    daysRented: Joi.string().optional(),
    checkin: Joi.date().optional(),
    checkout: Joi.date().optional(),
    totalAmount: Joi.number().optional(),
    clientName: Joi.string().optional(),
    clientNumber: Joi.string().optional(),
    clientEmail: Joi.string().optional(),
  }),
  payloadRental: Joi.object().keys({
    apartment: Joi.string().required(),
    images: Joi.array().optional(),
    furnished: Joi.boolean().required(),
    description: Joi.string().required(),
    perMonth: Joi.number().optional(),
    perDay: Joi.number().optional(),
    rentType: Joi.string().required(),
  }),
  updateRental: Joi.object().keys({
    furnished: Joi.boolean().required(),
    description: Joi.string().required(),
    perMonth: Joi.number().optional(),
    perDay: Joi.number().optional(),
    rentType: Joi.string().required(),
  }),
  updateRentalImage: Joi.object().keys({
    imageUrl: Joi.string().required(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
  payloadRentComm: Joi.object().keys({
    type: Joi.string().required(),
    description: Joi.string().optional(),
    percentage: Joi.string().required(),
  }),
  updateRentComm: Joi.object().keys({
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    percentage: Joi.string().optional(),
  }),
};
