const Joi = require("joi");
const { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } = require("../constants/regular.constants");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100),
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(PASSWORD_REGEX).required().trim(),
    isAdminValidator: Joi.boolean(),
    profilePictureValidator: Joi.string(),
    coverPictureValidator: Joi.string(),
    aboutValidator: Joi.string(),
    livesinValidator: Joi.string(),
    worksatValidator: Joi.string(),
    relationshipValidator: Joi.string(),
};