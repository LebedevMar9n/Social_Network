const Joi = require("joi");

module.exports = {
   newPostValidator: Joi.object({
      userId: Joi.string().required(),
      desc: Joi.string().required(),
      image: Joi.allow(),
   }),
};