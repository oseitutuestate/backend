import Joi from "@hapi/joi";

export default {
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
