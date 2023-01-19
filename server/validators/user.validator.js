const Joi = require("joi");

const { nameValidator, emailValidator, passwordValidator } = require("./common.validator");

module.exports = {
    newUserValidator: Joi.object({
        firstname: nameValidator.required(),
        lastname: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        confirmpassword:passwordValidator
    }),

    updateUserValidator: Joi.object({
        firstname: nameValidator,
        lastname: nameValidator,
        email: emailValidator,
        password: passwordValidator,
        confirmpassword:passwordValidator
    }),
};