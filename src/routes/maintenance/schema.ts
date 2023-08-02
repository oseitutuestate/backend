import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    assetId: Joi.string().required(),
    cost: Joi.number().required(),
    state: Joi.string().optional(),
    dateReview: Joi.string().optional(),
    remarks: Joi.string().optional(),
    recordedBy: Joi.string().required(),
    nextDayOfMaintenance: Joi.string().optional(),
  }),
  update: Joi.object().keys({
    cost: Joi.number().optional(),
    state: Joi.string().optional(),
    dateReview: Joi.string().optional(),
    remarks: Joi.string().optional(),
    nextDayOfMaintenance: Joi.string().optional(),
  }),
};
