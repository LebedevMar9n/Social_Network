const Joi = require("joi");

const { nameValidator, emailValidator, passwordValidator } = require("./common.validator");

module.exports = {
    newUserValidator: Joi.object({
        firstname: nameValidator.required(),
        lastname: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        confirmpassword: passwordValidator
    }),

    updateUserValidator: Joi.object({
        firstname: nameValidator,
        lastname: nameValidator,
        profilePicture: Joi.allow(),
        coverPicture: Joi.allow(),
        livesin: Joi.allow(),
        worksAt: Joi.allow(),
        country: Joi.allow(),
        relationship: Joi.allow(),
    }),
};