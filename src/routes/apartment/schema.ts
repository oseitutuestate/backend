import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    type: Joi.string().required(),
    houseNumber: Joi.string().required(),
    block: Joi.string().required(),
    ownerName: Joi.string().required(),
    ownerEmail: Joi.string().required(),
    ownerNumber: Joi.string().required(),
  }),
};
